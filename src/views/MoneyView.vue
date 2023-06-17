<template>
  <Layout classPrefix="layout">
    <Types :type.sync="record.type" />
    <Tags @update:selectedTags="onUpdateSelectedTags" :dataSource.sync="tags" />
    <Remark @update:remark="onUpdateRemark" />
    <NumberPad @update:amount="onUpdateAmount" />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import Types from "@/components/Money/Types.vue";
import Tags from "@/components/Money/Tags.vue";
import Remark from "@/components/Money/Remark.vue";
import NumberPad from "@/components/Money/NumberPad.vue";

window.localStorage.setItem("version", "0.0.1");

type Record = {
  //自定义数据类型
  type: string;
  selectedtags: string[];
  remark: string;
  amount: number;
  createdAt?: Date;
};

@Component({
  components: {
    Types,
    Tags,
    Remark,
    NumberPad,
  },
})
export default class MoneyView extends Vue {
  tags = ["衣", "食", "住", "行"];
  recordList: Record[] = JSON.parse(
    window.localStorage.getItem("recordList") || "[]"
  );
  record: Record = { type: "-", selectedtags: [], remark: "", amount: 0 };
  //收集功能组件中用户提交的数据
  onUpdateSelectedTags(selectedtags: string[]) {
    this.record.selectedtags = selectedtags;
  }
  onUpdateRemark(remark: string) {
    this.record.remark = remark;
  }
  onUpdateAmount(amount: string) {
    this.record.amount = parseFloat(amount);
    //提交记录
    const recordClon: Record = JSON.parse(JSON.stringify(this.record));
    recordClon.createdAt = new Date();
    this.recordList.push(recordClon);
  }
  //提交数据保存至localStorage
  @Watch("recordList")
  onRecordListChanged() {
    window.localStorage.setItem("recordList", JSON.stringify(this.recordList));
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>