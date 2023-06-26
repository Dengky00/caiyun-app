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