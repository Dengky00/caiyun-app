<template>
  <!-- @click="$emit('click', $event)" -->
  <button class="button"><slot></slot></button>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class Button extends Vue {}
</script>

<style scoped lang="scss">
@import "~@/assets/style/helper.scss";
.button {
  font-size: 24px;
  background: $yellow;
  border-radius: 4px;
  border: none;
  padding: 8px 16px;
  &-wrapper {
    text-align: center;
    margin-top: 50px;
  }
}
</style>