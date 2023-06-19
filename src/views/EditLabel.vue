<template>
  <Layout>
    <div class="navBar">
      <Icon name="left" class="leftIcon" />
      <span class="title">编辑标签</span>
    </div>
    <FormItem fieldName="标签名" class="form" :form="initialTag.name" />
    <div class="button-wrapper">
      <Button>删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import tagListModel from "@/models/tagListModel";
import FormItem from "@/components/Money/FormItem.vue";
import Button from "@/components/Button.vue";

@Component({
  components: { FormItem, Button },
})
export default class EditLabel extends Vue {
  initialTag: Tag = { id: "", name: "" };
  created() {
    const id = this.$route.params.id;
    const tags = tagListModel.fetch();
    const tag = tags.filter((t) => t.id === id)[0];
    if (tag) {
      this.initialTag = tag;
    } else {
      this.$router.replace("/404");
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/style/helper.scss";
.navBar {
  text-align: center;
  font-size: 24px;
  padding: 14px 16px;
  background: $yellow;
  position: relative;
  > .leftIcon {
    position: absolute;
    left: 16px;
    top: 20px;
  }
}
.form {
  margin-top: 8px;
  @extend %outerShadow;
}
.button-wrapper {
  text-align: center;
  margin-top: 50px;
}
</style>