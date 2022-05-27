<template>
  <div class="edit-page">
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
import detailMix from "@/mixins/detail";
import { mapActions, mapMutations } from "vuex";

export default {
  name: "EditPage",
  components: {
    commonHeader,
    configPage,
    materialList,
    mainScreen,
  },
  mixins: [detailMix],
  data() {
    return {
      layerCollapse: false,
      configCollapse: false,
      ScreenBgColor: "rgb(36,43,41)",
      currentType: "screen",
    };
  },
  // watch
  created() {
    this.setPanelId(this.id);
  },
  methods: {
    ...mapMutations("panel", ["setPanelId"]),
  },
};
</script>
<style scoped lang="scss">
.edit-page {
  display: flex;
  justify-content: space-between;
  overflow: hidden;

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
