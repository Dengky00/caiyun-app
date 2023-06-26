<template>
  <Layout>
    <Tabs :dataSource="typeList" :value.sync="type" classPrefix="type" />
    <Tabs
      :dataSource="intervalList"
      :value.sync="interval"
      classPrefix="interval"
    />
  </Layout>
</template>

<script lang="ts">
import Tabs from "@/components/Tabs.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    Tabs,
  },
})
export default class StatisticsView extends Vue {
  type = "-";
  interval = "day";
  typeList = [
    { text: "支出", value: "-" },
    { text: "收入", value: "+" },
  ];
  intervalList = [
    { text: "按天", value: "day" },
    { text: "按周", value: "week" },
    { text: "按月", value: "month" },
  ];
}
</script>
<style scoped lang="scss">
::v-deep .type-tabs-item {
  opacity: 1 !important;
  &.selected {
    background: #ffaa44;
    &::after {
      display: none;
    }
  }
}
</style>