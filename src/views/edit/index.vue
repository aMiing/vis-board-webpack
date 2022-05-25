<template>
  <div class="main">
    <!-- 左侧层级区域 -->
    <div class="left-config__pannel">
      <g-drag-box
        placement="right"
        span="300"
        min="0"
        max="400"
        collapse-button
        collapse2min
        :drag="true"
      >
        <materialList />
      </g-drag-box>
    </div>

    <!-- 中心舞台 -->
    <div class="screen-content">
      <mainScreen />
      <!-- 缩放控制器 -->
    </div>
    <!-- 右侧设置面板 -->
    <div class="right-config__panel">
      <g-drag-box
        placement="left"
        span="320"
        min="0"
        max="400"
        collapse-button
        collapse2min
        :drag="true"
      >
        <configPage :type="currentType" />
      </g-drag-box>
    </div>
  </div>
</template>

<script>
import commonHeader from "./components/header";
import configPage from "./components/config-page";
import materialList from "./components/material";
import mainScreen from "./components/main-screen";

export default {
  components: {
    commonHeader,
    configPage,
    materialList,
    mainScreen,
  },
  data() {
    return {
      layerCollapse: false,
      configCollapse: false,
      ScreenBgColor: "rgb(36,43,41)",
      currentType: "screen",
    };
  },
  // watch
  created: function () {
    // 获取tabItems、pageComponents数据
    // this.pageComponents = [
    //   {
    //     label: "文本",
    //     name: "commonText",
    //     component: "common-text",
    //     color: "#fff",
    //     fontSize: 14,
    //     fontWeight: 400,
    //     fontFamily: "",
    //     text: "我是通用文本组件",
    //     textAlign: "center",
    //     id: "a2e84f8ae81d8",
    //   },
    // ];
  },
  mounted() {},
  methods: {},
};
</script>
<style scoped lang="scss">
.main {
  position: absolute;
  width: 100%;
  height: 100%;
  padding-top: 36px;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  background: var(--grey-1);
  aside {
    color: #666;
    background-color: #f4f4f4;
    overflow: hidden;
    .collapse-btn {
      position: fixed;
      z-index: 9;

      margin-top: 6px;
      border-left: 0;
      text-align: center;
      padding: 8px;
      border: 1px solid #444;
    }
  }

  .left-config__pannel {
    background: var(--grey-3, #2e3857);
  }
  .right-config__panel {
    background: var(--grey-3, #2e3857);
  }
  .screen-content {
    flex: 1;
    // overflow: auto;
    overflow: hidden;
    margin: 20px;
  }
  ::v-deep {
    .drag-box__content {
      overflow: hidden;
    }
  }
}
</style>
