<template>
  <div class="setting-content">
    <el-tabs type="border-card">
      <el-tab-pane label="样式">
        <attrConfig :data="data" />
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
  </div>
</template>
<script>
import attrConfig from "./attrs";
export default {
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
};
</script>
<style lang="scss" scoped>
.setting-content {
  position: relative;
  height:100%;
}
</style>