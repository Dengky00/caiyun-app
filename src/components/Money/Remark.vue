<template>
  <label>
    <span class="name">
      <Icon name="remark" />
      备注
    </span>
    <input type="text" placeholder="在这里输入备注" v-model="remark" />
  </label>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";

@Component
export default class Remark extends Vue {
  remark = "";
  @Watch("remark")
  onRemarkChanged(val: string) {
    this.$emit("update:remark", val);
  }
}
</script>

<style scoped lang="scss">
label {
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
</style>