<template>
  <Layout classPrefix="layout" :style="{ height: h + 'px' }">
    <Tabs :dataSource="typeList" :value.sync="record.value" />
    <Tags :selectedTag.sync="record.selectedtag" :type="record.value" />
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
  h?: number;
  typeList = typeList;
  record: RecordItem = { value: "-", selectedtag: "", form: "", amount: 0 };
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
  mounted() {
    this.h = document.body.clientHeight;
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