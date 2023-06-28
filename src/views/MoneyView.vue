<template>
  <Layout classPrefix="layout">
    <Tabs :dataSource="typeList" :value.sync="record.value" />
    <Tags @update:selectedTag="onUpdateSelectedTag" />
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
import typeList from "@/constants/typeList";

@Component({
  components: {
    Tabs,
    Tags,
    FormItem,
    NumberPad,
  },
})
export default class MoneyView extends Vue {
  typeList = typeList;
  record: RecordItem = { value: "-", selectedtag: "", form: "", amount: 0 };
  created() {
    this.$store.commit("fetchRecords");
  }
  //收集功能组件中用户提交的数据
  onUpdateSelectedTag(selectedtag: string) {
    this.record.selectedtag = selectedtag;
  }
  onUpdateForm(form: string) {
    this.record.form = form;
  }
  onUpdateAmount(amount: string) {
    this.record.amount = parseFloat(amount);
    //更新提交记账数据
    if(this.record.selectedtag){
      this.$store.commit("createRecord", this.record);
    }
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