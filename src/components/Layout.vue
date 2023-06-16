<template>
  <div class="layout-wrapper" :class="classPrefix && `${classPrefix}-wrapper`">
    <div class="content" :class="classPrefix && `${classPrefix}-content`">
      <!-- 插槽 -->
      <slot></slot>
    </div>
    <NavBottom />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import NavBottom from "@/components/NavBottom.vue";

@Component({
  components: {
    NavBottom,
  },
})
export default class Layout extends Vue {
  @Prop(String) classPrefix: string | undefined;
}
</script>

<style scoped lang="scss">
.layout-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.content {
  flex-grow: 1;
  overflow: auto;
}
</style>