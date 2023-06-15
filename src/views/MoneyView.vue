<template>
  <Layout classPrefix="layout">
    <Types/>
    <Tags/>
    <NumberPad/>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import Types from "@/components/Money/Types.vue";
import Tags from "@/components/Money/Tags.vue";
import NumberPad from "@/components/Money/NumberPad.vue";
export default Vue.extend({
  components: { Types,Tags,NumberPad },
});
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>