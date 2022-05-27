<template>
  <div id="app">
    <router-view transition="fade" transition-mode="out-in"></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
};
</script>

<style lang="scss">
body {
  margin: 0px;
  padding: 0px;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  * {
    box-sizing: border-box;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  #app {
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0;
    right: 0;
    background: var(--grey-1);
  }
}
</style>
