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
      <li class="new">
        <router-link to="/money/labels"> + </router-link>
      </li>
    </ul>
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
    this.$emit("update:selectedTag", tagName);
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
      &.new {
        padding: 0;
        font-size: 38px;
        min-width: 48px;
        border-radius: 50%;
      }
    }
  }
}
</style>