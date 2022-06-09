<template>
  <div class="setting-content">
    <el-tabs v-if="activatedEl" type="border-card" :stretch="true">
      <el-tab-pane label="样式">
        <div class="widget-title">组件名称： {{ activatedEl.label || "--" }}</div>
        <attrConfig :data="activatedEl" />
      </el-tab-pane>
      <el-tab-pane label="数据">
        <span>數據部分</span>
      </el-tab-pane>
      <el-tab-pane label="交互">
        <h3>
          <span style="padding: 0">交互配置</span>
        </h3>
      </el-tab-pane>
    </el-tabs>
    <div v-else class="no-data">
      <p>请先选择组件~</p>
    </div>
  </div>
</template>
<script>
import attrConfig from "./widget/attributes.vue";
export default {
  name: "WidgetConfig",
  props: {
    activatedEl: {
      type: Object,
      default: null,
    },
  },
  components: {
    attrConfig,
  },
  data() {
    return {
      pageComponents: [],
      data: {
        title: "组件名",
      },
    };
  },
  computed: {},
};
</script>
<style lang="scss" scoped>
.setting-content {
  position: relative;
  height: 100%;
  .widget-title {
    line-height: 32px;
    padding: 4px 0;
    font-weight: 600;
  }
}
.no-data {
  text-align: center;
  padding: 12px;
}
</style>
