<template>
  <Layout>
    <Tabs :dataSource="typeList" :value.sync="type" />
    <div class="data">
      <div class="month"><input type="month" v-model="month" /></div>
      <div class="record">
        <div class="money">-￥{{ subMoney }}</div>
        <div class="money">+￥{{ addMoney }}</div>
      </div>
      <div class="money">盈余:￥{{ sumMoney }}</div>
    </div>
    <div id="chart" ref="chart"></div>
  </Layout>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import typeList from "@/constants/typeList";
import * as echarts from "echarts";
import dayjs from "dayjs";
import Decimal from "decimal.js";
import { EChartsType } from "echarts";

@Component({
  components: {
    Tabs,
  },
})
export default class ChartsView extends Vue {
  myChart?: EChartsType;
  type = "-";
  typeList = typeList;
  month = dayjs(new Date()).format("YYYY-MM");
  get recordList() {
    return this.$store.state.recordList as RecordItem[];
  }
  get monthRecord() {
    return this.recordList.filter(
      (r) => r.createdAt!.substring(0, 7) === this.month
    );
  }
  get subRecord() {
    return this.monthRecord.filter((r) => r.value === "-");
  }
  get addRecord() {
    return this.monthRecord.filter((r) => r.value === "+");
  }
  get subMoney() {
    let sum = new Decimal(0);
    for (let r of this.subRecord) {
      sum = sum.add(new Decimal(r.amount));
    }
    return sum.toNumber();
  }
  get addMoney() {
    let sum = new Decimal(0);
    for (let r of this.addRecord) {
      sum = sum.add(new Decimal(r.amount));
    }
    return sum.toNumber();
  }
  get sumMoney() {
    return this.addMoney - this.subMoney;
  }
  get dateList() {
    let dateSubList = this.mergedDate(this.subRecord);
    let dateAddList = this.mergedDate(this.addRecord);
    if (this.type === "-") {
      return dateSubList;
    } else if (this.type === "+") {
      return dateAddList;
    } else {
      return [];
    }
  }
  mergedDate(dateList: RecordItem[]) {
    const result = dateList.reduce((result: { [key: string]: number }, r) => {
      if (result[r.selectedtag]) {
        let sum = new Decimal(result[r.selectedtag]);
        sum = sum.add(new Decimal(r.amount));
        result[r.selectedtag] = sum.toNumber();
      } else {
        result[r.selectedtag] = r.amount;
      }
      return result;
    }, {});
    const newArr = [];
    for (let selectedtag in result) {
      newArr.push({
        value: result[selectedtag],
        name: selectedtag,
      });
    }
    return newArr;
  }

  created() {
    this.$store.commit("fetchRecords");
  }
  mounted() {
    // 初始化图表
    this.myChart = echarts.init(this.$refs.chart as HTMLDivElement);
    this.myChart.setOption(this.option);
  }
  @Watch("dateList")
  onValueChanged() {
    console.log(this.dateList);
    this.myChart?.setOption({
      series: [{ data: this.dateList }],
    });
  }
  option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 30,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: this.dateList,
      },
    ],
  };
}
</script>

<style scoped lang="scss">
@import "~@/assets/style/helper.scss";
.data {
  text-align: center;
  margin: 20px auto;
  width: 80%;
  > .month {
    border: 1px solid #ccc;
    > input {
      font-size: 20px;
      height: 38px;
      width: 90%;
      background: transparent;
      border: none;
    }
  }
  > .record {
    display: flex;
    justify-content: space-between;
  }
  .money {
    @extend %outerShadow;
    margin: 10px auto;
    font-size: 18px;
    width: 45%;
    height: 64px;
    line-height: 64px;
    border-radius: 18px;
    &:nth-child(1) {
      color: green;
    }
    &:nth-child(2) {
      color: red;
    }
    &:nth-child(3) {
      color: darken($yellow, 24%);
      width: 60%;
    }
  }
}
#chart {
  width: 100%;
  height: 50%;
}
</style>