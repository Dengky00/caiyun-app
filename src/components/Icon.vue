<template>
  <svg class="icon" @click="$emit('click', $event)">
    <use :xlink:href="'#' + name" />
  </svg>
</template>

<script lang="ts">
import Vue from "vue";

//一次性引入所有svg
let importAll = (requireContext: __WebpackModuleApi.RequireContext) =>
  requireContext.keys().forEach(requireContext);
try {
  importAll(require.context("../assets/icons", true, /\.svg$/));
} catch (error) {
  console.log(error);
}

export default Vue.extend({
  props: ["name"],
});
</script>

<style scoped lang="scss">
.icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  vertical-align: -0.15em;
}
</style>