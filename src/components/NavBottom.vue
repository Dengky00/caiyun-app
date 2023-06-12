<template>
  <div class="nav">
    <router-link to="/money">
      <Icon name="money"/>
      记账
    </router-link>
    |
    <router-link to="/labels">
      <Icon name="labels"/>
      标签
    </router-link>
    |
    <router-link to="/statistics">
      <Icon name="statistics"/>
      统计
    </router-link>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Icon from "./Icon.vue";

export default Vue.extend({
  components: { Icon },});
</script>

<style scoped lang="scss">
.nav {
  border: 1px red solid;
}
</style>