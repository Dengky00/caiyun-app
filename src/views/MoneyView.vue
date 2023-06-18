<template>
  <Layout classPrefix="layout">
    <Types :type.sync="record.type" />
    <Tags @update:selectedTags="onUpdateSelectedTags" :dataSource="tags" />
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
import recordListModel from "@/models/recordListModel";
import tagListModel from "@/models/tagListModel";

const recordList = recordListModel.fetch();
const tagList = tagListModel.fetch();

@Component({
  components: {
    Types,
    Tags,
    Remark,
    NumberPad,
  },
})
export default class MoneyView extends Vue {
  tags = tagList;
  recordList: RecordItem[] = recordList;
  record: RecordItem = { type: "-", selectedtags: [], remark: "", amount: 0 };
  //收集功能组件中用户提交的数据
  onUpdateSelectedTags(selectedtags: string[]) {
    this.record.selectedtags = selectedtags;
  }
  onUpdateRemark(remark: string) {
    this.record.remark = remark;
  }
  onUpdateAmount(amount: string) {
    this.record.amount = parseFloat(amount);
    //更新提交记账数据记录
    const recordClone = recordListModel.clone(this.record);
    recordClone.createdAt = new Date();
    this.recordList.push(recordClone);
  }
  //提交数据保存至localStorage
  @Watch("recordList")
  onRecordListChanged() {
    recordListModel.save(this.recordList);
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