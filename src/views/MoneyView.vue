<template>
  <div class="nav-wrapper">
    <div class="content">Money.vue</div>
    <NavBottom />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>

<style lang="scss" scoped>
.nav-wrapper {
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.content {
  flex-grow: 1;
  overflow: auto;
}
</style>