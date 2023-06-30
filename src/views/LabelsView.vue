<template>
  <Layout>
    <Tabs :dataSource="typeList" :value.sync="type"/>
    <div class="tags">
      <router-link
        class="tag"
        v-for="tag in tagList"
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
import { Component, Vue } from "vue-property-decorator";
import Button from "@/components/Button.vue";
import Tabs from "@/components/Tabs.vue";
import typeList from "@/constants/typeList";

@Component({
  components: { Button, Tabs },
})
export default class LabelsView extends Vue {
  type = "-";
  typeList = typeList;
  get tagList() {
    return this.$store.state.tagList.filter((t: Tag) => t.type === this.type);
  }
  created() {
    this.$store.commit("fetchTags");
  }
  createTag() {
    this.$store.commit("createTag",this.type);
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