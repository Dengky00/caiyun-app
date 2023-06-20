<template>
  <Layout>
    <div class="navBar">
      <Icon name="left" class="leftIcon" @click="goBack" />
      <span class="title">编辑标签</span>
    </div>
    <FormItem
      fieldName="标签名"
      class="form"
      :form="tag.name"
      @update:form="updateTag"
    />
    <div class="button-wrapper">
      <Button @click.native="removeTag">删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import FormItem from "@/components/Money/FormItem.vue";
import Button from "@/components/Button.vue";
import store from "@/store/index2";

@Component({
  components: { FormItem, Button },
})
export default class EditLabel extends Vue {
  tag = store.findTag(this.$route.params.id);
  created() {
    if (!this.tag) {
      this.$router.replace("/404");
    }
  }
  updateTag(name: string) {
    store.updateTag(this.tag.id, name);
  }
  removeTag() {
    if (store.removeTag(this.tag)) {
      this.$router.replace("/labels");
    } else {
      window.alert("删除失败!");
    }
  }
  goBack() {
    this.$router.replace("/labels");
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