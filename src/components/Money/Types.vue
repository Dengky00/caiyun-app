<template>
  <ul class="types">
    <li :class="type === '-' && 'selected'" @click="selectType('-')">支出</li>
    <li :class="type === '+' && 'selected'" @click="selectType('+')">收入</li>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class Types extends Vue {
  type = "-"; //'-'表示支出,'+表示收入'
  selectType(type: string) {
    if (type !== "-" && type !== "+") {
      throw new Error("type is unknown");
    }
    this.type = type;
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/style/helper.scss";
.types {
  display: flex;
  background: $yellow;
  font-size: 24px;
  > li {
    width: 50%;
    padding: 20px 0 8px 0;
    text-align: center;
    position: relative;
    opacity: 0.7;
    &.selected {
      opacity: 1;
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: #333;
      }
    }
  }
}
</style>