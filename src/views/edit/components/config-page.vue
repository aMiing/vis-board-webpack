<template>
  <div class="config">
    <div class="tabs-content">
      <el-tabs type="card" v-model="activeTab" :stretch="true">
        <el-tab-pane class="radio-item" name="screen" label="屏幕设置"></el-tab-pane>
        <el-tab-pane class="radio-item" name="widget" label="组件设置"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="config__main">
      <screen-config
        v-show="activeTab === 'screen'"
        v-bind="$attrs"
        v-on="$listeners"
      ></screen-config>
      <!-- 组件属性设置面板 -->
      <widget-config
        v-show="activeTab === 'widget'"
        v-bind="$attrs"
        v-on="$listeners"
      ></widget-config>
    </div>
  </div>
</template>

<script>
import screenConfig from "./config/screen-config";
import widgetConfig from "./config/widget-config";
export default {
  name: "",
  components: {
    screenConfig,
    widgetConfig,
  },
  data() {
    return {
      activeTab: "screen",
    };
  },
};
</script>

<style scoped lang="scss">
.config {
  display: flex;
  flex-direction: column;
  height: 100%;
  .config__main {
    flex: 1;
    overflow: auto;
  }
  ::v-deep {
    .el-tabs__header {
      margin-bottom: 0px;
    }
  }
}
</style>
