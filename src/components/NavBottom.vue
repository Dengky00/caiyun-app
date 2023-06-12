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
nav {
  display: flex;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.3);
  font-size: 12px;
  > .item {
    padding: 4px 0;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > .icon {
      width: 32px;
      height: 32px;
    }
  }
  > .item.selected {
    background-color: rgb(222, 222, 222);
  }
}
</style>