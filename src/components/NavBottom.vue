<template>
  <nav>
    <router-link to="/money" class="item" active-class="selected">
      <Icon name="money" />
      记账
    </router-link>
    <router-link to="/labels" class="item" active-class="selected">
      <Icon name="labels" />
      标签
    </router-link>
    <router-link to="/statistics" class="item" active-class="selected">
      <Icon name="statistics" />
      统计
    </router-link>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>

<style scoped lang="scss">
@import "~@/assets/style/helper.scss";
nav {
  @extend %outerShadow;
  display: flex;
  font-size: 12px;
  color: darken($yellow, 24%);
  > .item {
    padding: 4px 0;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    opacity: 0.6;
    &.selected {
        opacity: 1;
      }
    > .icon {
      width: 32px;
      height: 32px;
      color: $yellow;
    }
  }
}
</style>