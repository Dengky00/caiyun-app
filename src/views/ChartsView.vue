<template>
  <Layout>
    <Tabs :dataSource="typeList" :value.sync="type" />
    <!-- <ECharts :options="polar" /> -->
  </Layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import typeList from "@/constants/typeList";
// const ECharts = require("vue-echarts").default;
// import ECharts from 'vue-echarts'
// import "echarts/lib/chart/line";
// import "echarts/lib/component/polar";

@Component({
  components: {
    Tabs,
    // ECharts,
  },
})
export default class ChartsView extends Vue {
  type = "-";
  typeList = typeList;

  // get polar() {
  //   let data = [];
  //   for (let i = 0; i <= 360; i++) {
  //     let t = (i / 180) * Math.PI;
  //     let r = Math.sin(2 * t) * Math.cos(2 * t);
  //     data.push([r, i]);
  //   }
  //   return {
  //     title: {
  //       text: "极坐标双数值轴",
  //     },
  //     legend: {
  //       data: ["line"],
  //     },
  //     polar: {
  //       center: ["50%", "54%"],
  //     },
  //     tooltip: {
  //       trigger: "axis",
  //       axisPointer: {
  //         type: "cross",
  //       },
  //     },
  //     angleAxis: {
  //       type: "value",
  //       startAngle: 0,
  //     },
  //     radiusAxis: {
  //       min: 0,
  //     },
  //     series: [
  //       {
  //         coordinateSystem: "polar",
  //         name: "line",
  //         type: "line",
  //         showSymbol: false,
  //         data: data,
  //       },
  //     ],
  //     animationDuration: 2000,
  //   };
  // }
}
</script>

<style scoped lang="scss">
</style>