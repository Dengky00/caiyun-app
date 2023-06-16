<template>
  <ul class="types">
    <li :class="type === '-' && 'selected'" @click="selectType('-')">支出</li>
    <li :class="type === '+' && 'selected'" @click="selectType('+')">收入</li>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

@Component
export default class Types extends Vue {
  @Prop() readonly type!:string//使用'!'表示确保变量的值不为null或undefined
  selectType(type: string) {
    this.$emit("update:type", type);
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