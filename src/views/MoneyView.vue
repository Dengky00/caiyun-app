<template>
  <Layout classPrefix="layout">
    <Tabs :dataSource="typeList" :value.sync="record.value" />
    <Tags :selectedTag.sync="record.selectedtag" :type="record.value" />
    <!-- <FormItem fieldName="日期" :form.sync="record.createdAt" /> -->
    <recordDate :date.sync="record.createdAt" />
    <hr />
    <FormItem fieldName="备注" :form.sync="record.form" />
    <NumberPad @update:amount="onUpdateAmount" />
  </Layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import Tags from "@/components/Money/Tags.vue";
import FormItem from "@/components/FormItem.vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import recordDate from "@/components/recordDate.vue";
import typeList from "@/constants/typeList";
import dayjs from "dayjs";

@Component({
  components: {
    Tabs,
    Tags,
    FormItem,
    NumberPad,
    recordDate,
  },
})
export default class MoneyView extends Vue {
  typeList = typeList;
  record: RecordItem = {
    id: "0",
    value: "-",
    selectedtag: "",
    form: "",
    amount: 0,
    createdAt: dayjs().format("YYYY-MM-DD"),
  };
  created() {
    this.$store.commit("fetchRecords");
  }
  //收集功能组件中用户提交的数据
  onUpdateAmount(amount: string) {
    this.record.amount = parseFloat(amount);
    //更新提交记账数据
    if (this.record.selectedtag) {
      this.$store.commit("createRecord", this.record);
      this.record.form = "";
    } else if (this.record.selectedtag === "") {
      window.alert("未选择标签!");
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