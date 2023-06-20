<template>
  <Layout classPrefix="layout">
    <Types :type.sync="record.type" />
    <Tags @update:selectedTags="onUpdateSelectedTags" :dataSource="tags" />
    <FormItem fieldName="备注" @update:form="onUpdateForm" />
    <NumberPad @update:amount="onUpdateAmount" />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Types from "@/components/Money/Types.vue";
import Tags from "@/components/Money/Tags.vue";
import FormItem from "@/components/Money/FormItem.vue";
import NumberPad from "@/components/Money/NumberPad.vue";

@Component({
  components: {
    Types,
    Tags,
    FormItem,
    NumberPad,
  },
})
export default class MoneyView extends Vue {
  tags = window.tagList;
  recordList = window.recordList;
  record: RecordItem = { type: "-", selectedtags: [], form: "", amount: 0 };
  //收集功能组件中用户提交的数据
  onUpdateSelectedTags(selectedtags: string[]) {
    this.record.selectedtags = selectedtags;
  }
  onUpdateForm(form: string) {
    this.record.form = form;
  }
  onUpdateAmount(amount: string) {
    this.record.amount = parseFloat(amount);
    //更新提交记账数据
    window.createRecord(this.record);
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