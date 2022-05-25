<template>
  <!--  通用配置页面：屏幕配置+组件配置 -->
  <!-- 屏幕设置 -->
  <screen-config v-if="type === 'screen'"></screen-config>
  <!-- 组件属性设置面板 -->
  <widget-config v-else> </widget-config>
</template>

<script>
import screenConfig from "./config/screen-config";
import widgetConfig from "./config/widget-config";
export default {
  components: {
    screenConfig,
    widgetConfig,
  },
  props: {
    type: {
      type: String,
      default: "screen",
    },
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss">
.config-page {
}
</style>
