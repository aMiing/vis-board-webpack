<template>
  <div class="main">
    <!-- 左侧区域 -->
    <div class="left-config__panel">
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
      <mainScreen v-model="screen" />
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
        <configPage :type="currentType" v-model="screen" />
      </g-drag-box>
    </div>
  </div>
</template>

<script>
import commonHeader from "./components/header";
import configPage from "./components/config-page";
import materialList from "./components/material";
import mainScreen from "./components/main-screen";
import { mapActions, mapMutations } from "vuex";

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
      panels: [],
    };
  },
  // watch
  created() {
    this.getPanelList();
    console.log("this.$route", this.$route);

    this.setPanelId(this.id);
  },
  computed: {
    id() {
      return this.$route?.query?.id;
    },
    screen() {
      return this.panels.find(e => e.id === this.id);
    },
  },
  methods: {
    ...mapMutations("panel", ["setPanelId"]),
    getPanelList() {
      //   获取panelList
      const list = window.sessionStorage.getItem("panelListStr") || "[]";
      this.panels = JSON.parse(list);
    },
  },
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

  .left-config__panel {
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
