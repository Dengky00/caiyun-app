<template>
  <div class="tags">
    <ul class="current">
      <li
        v-for="tag in tagList"
        :key="tag.id"
        @click="toggle(tag.name)"
        :class="{ selected: selectedTag === tag.name }"
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
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Tags extends Vue {
  @Prop({ default: "" }) selectedTag?: string;
  @Prop() type!: string;
  get tagList() {
    return this.$store.state.tagList.filter((t: Tag) => t.type === this.type);
  }
  created() {
    this.$store.commit("fetchTags");
  }
  //是否选中tag
  toggle(tagName: string) {
    // this.selectedTag = tag;
    this.$emit("update:selectedTag", tagName);
  }
  createTag() {
    this.$store.commit("createTag", this.type);
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