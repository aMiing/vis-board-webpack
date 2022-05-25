<template>
  <div class="entry">
    <header-bar></header-bar>
    <router-view class="main-content" transition="fade" transition-mode="out-in"></router-view>
  </div>
</template>
<script>
import headerBar from "@/components/header-bar.vue";
export default {
  name: "root",
  components: { headerBar },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style scoped lang="scss"></style>
