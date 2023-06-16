<template>
  <div>
    当前页面不存在，请检查网页路径
    <div>
      <router-link to="/">返回首页</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class NotFound extends Vue {}
</script>

<style scoped lang="scss">
</style>