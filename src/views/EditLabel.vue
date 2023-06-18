<template>
  <Layout>编辑页面</Layout>
</template>

<script lang="ts">
import tagListModel from "@/models/tagListModel";
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class EditLabel extends Vue {
  created() {
    const id = this.$route.params.id;
    const tags = tagListModel.fetch();
    const tag = tags.filter((t) => t.id === id)[0];
    if(tag){
      console.log(tag);
    }else{
      this.$router.replace('/404')
    }
  }
}
</script>

<style scoped lang="scss">
</style>