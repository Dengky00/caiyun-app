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
        <h3 class="key">
          <span>{{ beautify(key) }}</span>
          <span>{{ type }}￥{{ recordSum(group) }}</span>
        </h3>
        <ol>
          <li v-for="item in group" :key="item.id" class="record">
            <span>{{ item.selectedtag }}</span>
            <span class="form">{{ item.form }}</span>
            <span>{{ type }}￥{{ item.amount }}</span>
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
import Decimal from "decimal.js";

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
    let string = "";
    const { recordList, type, interval } = this;
    const hashTable: { [key: string]: RecordItem[] } = {};
    recordList.sort((r1, r2) => {
      return dayjs(r2.createdAt).valueOf() - dayjs(r1.createdAt).valueOf();
    });
    const newList = recordList.filter((r) => r.value === type);
    if (interval === "day") {
      string = "YYYY年M月D日";
    } else if (interval === "month") {
      string = "YYYY年M月";
    } else if (interval === "year") {
      string = "YYYY年";
    }
    for (let r of newList) {
      const date = dayjs(r.createdAt).format(string);
      hashTable[date] = hashTable[date] || [];
      hashTable[date].push(r);
    }
    return hashTable;
  }
  created() {
    this.$store.commit("fetchRecords");
  }
  beautify(date: string | number) {
    date = date.toString();
    const now = dayjs();
    let nowDate = "";
    if (this.interval === "day") {
      nowDate = now.format("YYYY年M月D日");
      if (nowDate === date) {
        return "今天";
      } else if (nowDate.substring(0, 4) === date.substring(0, 4)) {
        return date.substring(5);
      } else {
        return date;
      }
    } else if (this.interval === "month") {
      nowDate = now.format("YYYY年M月");
      if (nowDate === date) {
        return "本月";
      } else if (nowDate.substring(0, 4) === date.substring(0, 4)) {
        return date.substring(5);
      } else {
        return date;
      }
    } else if (this.interval === "year") {
      nowDate = now.format("YYYY年");
      if (nowDate === date) {
        return "今年";
      } else {
        return date;
      }
    }
  }
  recordSum(group: RecordItem[]) {
    let sum = new Decimal(0);
    for (let r of group) {
      sum = new Decimal(sum).add(new Decimal(r.amount));
    }
    return sum;
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
.key,
.record {
  @extend %item;
}
.form {
  margin-right: auto;
  margin-left: 16px;
  color: #999;
  font-size: 12px;
}
h3 {
  background: #ebebeb;
  @extend %item;
}
</style>