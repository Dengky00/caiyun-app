<template>
  <Layout>
    <Tabs :dataSource="typeList" :value.sync="type" classPrefix="type" />
    <Tabs
      :dataSource="intervalList"
      :value.sync="interval"
      classPrefix="interval"
    />
    <ol>
      <li v-for="(group, key) in result" :key="key">
        <h3 class="key">{{ beautify(key) }}</h3>
        <ol>
          <li v-for="item in group" :key="item.id" class="record">
            <span>{{ item.selectedtag }}</span>
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
import dayjs from "dayjs";

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
    const hashTable: { [key: string]: RecordItem[] } = {};
    for (let i = 0; i < recordList.length; i++) {
      const date = dayjs(recordList[i].createdAt).format("YYYY-MM-DD");
      hashTable[date] = hashTable[date] || [];
      hashTable[date].push(recordList[i]);
    }
    return hashTable;
  }
  created() {
    this.$store.commit("fetchRecords");
  }
  beautify(date: string | number) {
    date = date.toString();
    const day=dayjs(date)
    const now=dayjs()
    if(day.isSame(now,'day')){
      return '今天'
    }else if(day.isSame(now.subtract(1,'day'),'day')){
      return '昨天'
    }else if(day.isSame(now.subtract(2,'day'),'day')){
      return '前天'
    }else if(day.isSame(now,'year')){
      return day.format('M月D日')
    }else{
      return day.format("YYYY年M月D日")
    }
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
}
.key {
  @extend %item;
}
.record {
  @extend %item;
}
.form {
  margin-right: auto;
  margin-left: 16px;
  color: #999;
  font-size: 12px;
}
</style>