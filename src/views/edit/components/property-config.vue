<template>
  <div class="config">
    <div class="tabs-content">
      <el-tabs type="card" v-model="activeTab" :stretch="true">
        <el-tab-pane class="radio-item" name="screen" label="屏幕设置"></el-tab-pane>
        <el-tab-pane class="radio-item" name="widget" label="组件设置"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="config__main">
      <!-- 组件属性设置面板 -->
      <widget-config
        v-show="activeTab === 'widget'"
        v-bind="$attrs"
        v-on="$listeners"
      ></widget-config>
      <screen-config
        v-show="activeTab === 'screen'"
        v-bind="$attrs"
        v-on="$listeners"
      ></screen-config>
    </div>
  </div>
</template>

<script>
import screenConfig from "./config/screen-config";
import widgetConfig from "./config/widget-config";
export default {
  name: "PropertyConfig",
  props: { clickTarget: { type: String, default: "screen" } },
  components: {
    screenConfig,
    widgetConfig,
  },
  data() {
    return {
      activeTab: "screen",
    };
  },
  watch: {
    clickTarget(val) {
      this.activeTab = val;
    },
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

<style lang="scss">
.form-item-content {
  display: flex;
  flex-direction: column;
  .item {
    // flex: 1;
    display: flex;
    margin-bottom: 8px;
    min-width: 120px;
    margin-right: 4px;
    .item-label {
      font-size: 12px;
      padding: 0 8px 0 4px;
      color: var(--grey-11);
      flex-shrink: 0;
    }
    .slider-box {
      flex: 1;
      padding: 0 4px;
    }
    .item-inner-box {
      display: flex;
      justify-content: flex-start;
      &.--wrap {
        flex-wrap: wrap;
      }
      .flex-box {
        padding: 0 4px;
        display: flex;
        flex-direction: column;
        .label {
          text-align: center;
          color: var(--grey-11);
          font-size: 12px;
          line-height: 20px;
        }
      }
    }
  }
}
</style>
