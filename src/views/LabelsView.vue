<template>
  <Layout>
    <ol class="tags">
      <li v-for="tag in tags" :key="tag.id">
        <span>{{ tag.name }}</span>
        <Icon name="right" />
      </li>
    </ol>
    <div class="createTag-wrapper">
      <button class="createTag" @click="createTag">新建标签</button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import tagListModel from "@/models/tagListModel";
import { Component } from "vue-property-decorator";

@Component
export default class LabelsView extends Vue {
  tags = tagListModel.fetch();
  createTag() {
    const name = window.prompt("请输出标签名:");
    if (name) {
      const message = tagListModel.create(name);
      if (message === "duplicated") {
        window.alert("标签名重复!");
      } else if (message === "success") {
        window.alert("添加成功!");
      }
    }
  }
}
</script>
<style scoped lang="scss">
@import "~@/assets/style/helper.scss";
.tags {
  font-size: 20px;
  > li {
    background: $yellow;
    padding: 6px 8px 6px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2px;
    border-radius: 8px;
  }
}
.createTag {
  font-size: 24px;
  background: $yellow;
  border-radius: 4px;
  border: none;
  padding: 8px 16px;
  &-wrapper {
    text-align: center;
    margin-top: 50px;
  }
}
</style>