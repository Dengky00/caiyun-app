<template>
  <div class="tags">
    <ul class="current">
      <li
        v-for="tag in dataSource"
        :key="tag.id"
        @click="toggle(tag.name)"
        :class="{ selected: selectedTags.indexOf(tag.name) >= 0 }"
      >
        {{ tag.name }}
      </li>
    </ul>
    <div class="new">
      <button @click="create">新增标签</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import tagListModel from "@/models/tagListModel";

@Component
export default class Tags extends Vue {
  @Prop(Array) readonly dataSource: Tag[] | undefined;
  selectedTags: string[] = [];
  toggle(tag: string) {
    //是否选中tag
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
    this.$emit("update:selectedTags", this.selectedTags);
  }
  create() {
    //创建新tag
    const name = window.prompt("请输入标签名");
    if (name && this.dataSource) {
      const message = tagListModel.create(name);
      if (message === "duplicated") {
        window.alert("标签名重复!");
      } else if (message === "success") {
        window.alert("添加成功!");
      }
      // this.$emit("update:dataSource", [...this.dataSource, name]);
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/style/helper.scss";
.tags {
  font-size: 18px;
  padding: 16px;
  flex-grow: 1;
  > .current {
    display: flex;
    flex-wrap: wrap;
    > li {
      background: #d9d9d9;
      min-width: 72px;
      $h: 48px;
      height: $h;
      line-height: $h;
      border-radius: $h/2;
      padding: 0 16px;
      margin-right: 16px;
      margin-top: 8px;
      text-align: center;
      overflow: hidden;
      &.selected {
        background: $yellow;
      }
    }
  }
  > .new {
    padding-top: 16px;
    button {
      background: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid;
      padding: 0 4px;
    }
  }
}
</style>