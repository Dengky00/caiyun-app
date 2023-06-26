<template>
  <Layout classPrefix="layout">
    <Tabs :dataSource="typeList" :value.sync="record.value" />
    <Tags @update:selectedTags="onUpdateSelectedTags" />
    <FormItem fieldName="备注" @update:form="onUpdateForm" />
    <NumberPad @update:amount="onUpdateAmount" />
  </Layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import Tags from "@/components/Money/Tags.vue";
import FormItem from "@/components/FormItem.vue";
import NumberPad from "@/components/Money/NumberPad.vue";

@Component({
  components: {
    Tabs,
    Tags,
    FormItem,
    NumberPad,
  },
})
export default class MoneyView extends Vue {
  typeList = [
    { text: "支出", value: "-" },
    { text: "收入", value: "+" },
  ];
  record: RecordItem = { value: "-", selectedtags: [], form: "", amount: 0 };
  created() {
    this.$store.commit("fetchRecords");
  }
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
    this.$store.commit("createRecord", this.record);
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