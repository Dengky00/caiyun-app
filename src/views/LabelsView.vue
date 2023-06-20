<template>
  <Layout>
    <div class="tags">
      <router-link
        class="tag"
        v-for="tag in tags"
        :key="tag.id"
        :to="`/labels/edit/${tag.id}`"
      >
        <span>{{ tag.name }}</span>
        <Icon name="right" />
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <Button class="createTag" @click.native="createTag">新建标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import Button from "@/components/Button.vue";
import { Component } from "vue-property-decorator";

@Component({
  components: { Button },
})
export default class LabelsView extends Vue {
  tags = window.tagList;
  createTag() {
    window.createTag();
  }
}
</script>
<style scoped lang="scss">
@import "~@/assets/style/helper.scss";
.tags {
  font-size: 20px;
  > .tag {
    @extend %outerShadow;
    padding: 6px 8px 6px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 8px;
    border-radius: 8px;
  }
}
.createTag-wrapper {
  text-align: center;
  margin-top: 50px;
}
</style>