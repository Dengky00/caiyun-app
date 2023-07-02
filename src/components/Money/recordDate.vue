<template>
  <label>
    <span class="name">
      <Icon name="date" />
      日期
    </span>
    <input type="date" :value="date" @input="onDateChanged($event)" />
  </label>
</template>

<script lang="ts">
import dayjs from "dayjs";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class recordDate extends Vue {
  @Prop() readonly date!: string;
  onDateChanged(event: Event) {
    const target = event.target as HTMLInputElement;
    this.$emit("update:date", target.value);
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
    height: 48px;
    flex-grow: 1;
    background: transparent;
    border: none;
    margin-right: 16px;
  }
}
</style>