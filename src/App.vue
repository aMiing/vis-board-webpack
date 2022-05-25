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
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun,
    sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  * {
    box-sizing: border-box;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  /*滚动条样式*/
  ::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 5px;
  }
  ::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.6);
    background: rgba(0, 0, 0, 0.6);
  }
}

#app {
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0;
  right: 0;
}
</style>
