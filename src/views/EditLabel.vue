<template>
  <Layout>
    <div class="navBar">
      <Icon name="left" class="leftIcon" @click="goBack" />
      <span class="title">编辑标签</span>
    </div>
    <FormItem
      fieldName="标签名"
      class="form"
      :form="currentTag.name"
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
import FormItem from "@/components/FormItem.vue";
import Button from "@/components/Button.vue";

@Component({
  components: { FormItem, Button },
})
export default class EditLabel extends Vue {
  get currentTag() {
    return this.$store.state.currentTag;
  }
  created() {
    this.$store.commit("fetchTags");
    this.$store.commit("findTag", this.$route.params.id);
    if (!this.currentTag) {
      this.$router.replace("/404");
    }
  }
  updateTag(name: string) {
    const object = { id: this.currentTag.id, name };
    this.$store.commit("updateTag", object);
  }
  removeTag() {
    this.$store.commit("removeTag", this.currentTag.id);
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