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
      <button @click="createTag">新增标签</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import store from "@/store/index2";

@Component
export default class Tags extends Vue {
  @Prop({ required: true }) readonly dataSource!: Tag[];
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
  createTag() {
    store.createTag();
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
      @extend %outerShadow;
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