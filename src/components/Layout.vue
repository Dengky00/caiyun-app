<template>
  <div class="nav-wrapper">
    <div class="content">
      <slot></slot>
    </div>
    <NavBottom />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import NavBottom from "@/components/NavBottom.vue";

export default Vue.extend({
  components: { NavBottom },
});
</script>

<style scoped lang="scss">
.nav-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.content {
  flex-grow: 1;
  overflow: auto;
}
</style>