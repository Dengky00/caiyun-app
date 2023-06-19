<template>
  <label>
    <span class="name">
      <Icon name="edit" />
      {{ fieldName }}
    </span>
    <input
      type="text"
      :placeholder="'在这里输入' + fieldName"
      :value="form"
      @input="onFormChanged($event)"
    />
  </label>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

@Component
export default class Form extends Vue {
  @Prop({ required: true }) fieldName!: string;
  @Prop({ default: "" }) readonly form!: string;
  // @Watch("form")
  onFormChanged(event: Event) {
    const target = event.target as HTMLInputElement;
    this.$emit("update:form", target.value);
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