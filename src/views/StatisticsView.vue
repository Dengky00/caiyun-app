<template>
  <Layout>
    <Tabs :dataSource="typeList" :value.sync="type" classPrefix="type" />
    <Tabs
      :dataSource="intervalList"
      :value.sync="interval"
      classPrefix="interval"
    />
    <ol>
      <li v-for="(group, index) in result" :key="index">
        <h3 class="title">{{ group.title }}</h3>
        <ol>
          <li v-for="item in group.items" :key="item.id" class="record">
            <span>{{ tagString(item.selectedtags) }}</span>
            <span class="form">{{ item.form }}</span>
            <span>￥{{ item.amount }}</span>
          </li>
        </ol>
      </li>
    </ol>
  </Layout>
</template>

<script lang="ts">
import Tabs from "@/components/Tabs.vue";
import typeList from "@/constants/typeList";
import intervalList from "@/constants/intervalList";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    Tabs,
  },
})
export default class StatisticsView extends Vue {
  type = "-";
  interval = "day";
  typeList = typeList;
  intervalList = intervalList;
  get recordList() {
    return this.$store.state.recordList as RecordItem[];
  }
  get result() {
    const { recordList } = this;
    const hashTable: {
      [key: string]: { title: string; items: RecordItem[] };
    } = {};
    for (let i = 0; i < recordList.length; i++) {
      const [date, time] = recordList[i].createdAt!.split("T");
      hashTable[date] = hashTable[date] || { title: date, items: [] };
      hashTable[date].items.push(recordList[i]);
    }
    return hashTable;
  }
  created() {
    this.$store.commit("fetchRecords");
  }
  tagString(tags: string[]) {
    return tags.join(",");
  }
}
</script>

<style scoped lang="scss">
::v-deep .interval-tabs-item {
  font-size: 20px;
  padding: 14px 0 4px 0;
  &.selected {
    background: none;
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: #333;
    }
  }
}
%item {
  padding: 0 16px;
  min-height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px red solid;
}
.title {
  @extend %item;
}
.record {
  @extend %item;
}
.form{
  margin-right: auto;
  margin-left: 16px;
  color: #999;
  font-size: 12px;
}
</style>