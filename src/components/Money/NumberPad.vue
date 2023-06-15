<template>
  <div class="numberPad">
    <label class="notes">
      <span class="name">
        <Icon name="remark" />
        备注
      </span>
      <input type="text" placeholder="在这里输入备注" />
    </label>
    <div class="output"></div>
    <div class="buttons">
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button class="delete"><Icon name="backspace" /></button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button class="ok">OK</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button class="zero">0</button>
      <button class="point">.</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>

<style scoped lang="scss">
@import "~@/assets/style/helper.scss";
.numberPad {
  > .notes {
    display: flex;
    align-items: center;
    background: #f5f5f5;
    font-size: 16px;
    padding-left: 16px;
    > .name {
      padding-right: 16px;
    }
    > input {
      height: 64px;
      flex-grow: 1;
      background: transparent;
      border: none;
      padding-right: 16px;
    }
  }
  > .output {
    @extend %innerShadow;
    font-size: 34px;
    font-family: Consolas, monospace;
    padding: 9px 16px;
    text-align: right;
    &:empty:before {
      //div模拟placeholder占位符
      content: "输入记账金额";
      color: #999;
      font-family: $font-hei;
    }
  }
  > .buttons {
    display: grid;
    grid: 25% 25% 25% 25%/25% 25% 25% 25%;
    height: 30vh;
    > button {
      margin: 2px;
      background: transparent;
      border: none;
      font-size: 20px;
      &.delete {
        grid-area: 1/4/3/5;
        font-size: 28px;
      }
      &.ok {
        grid-area: 3/4/5/5;
        font-size: 28px;
      }
      &.zero {
        grid-area: 4/1/5/3;
      }
      //按比例逐渐加深键盘颜色
      $bg: #f2f2f2;
      &:nth-child(1) {
        background: $bg;
      }
      &:nth-child(2),
      &:nth-child(5) {
        background: darken($bg, 4%);
      }
      &:nth-child(3),
      &:nth-child(6),
      &:nth-child(9) {
        background: darken($bg, 4 * 2%);
      }
      &:nth-child(7),
      &:nth-child(10) {
        background: darken($bg, 4 * 3%);
      }
      &:nth-child(4),
      &:nth-child(11),
      &:nth-child(12) {
        background: darken($bg, 4 * 4%);
      }
      &:nth-child(13) {
        background: darken($bg, 4 * 5%);
      }
      &:nth-child(8) {
        background: darken($bg, 4 * 6%);
      }
    }
  }
}
</style>