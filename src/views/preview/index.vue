<template>
  <div class="screen" ref="preview-screen" :style="screenConfig">
    <div
      v-for="item in elements"
      :key="item.id"
      class="component-wrap"
      style="position: absolute"
      :style="{
        width: item.width + item.sizeUnit,
        height: item.height + item.sizeUnit,
        left: item.posX + item.positionUnit,
        top: item.posY + item.positionUnit,
        zIndex: item.zIndex,
      }"
    >
      <component :key="item.id" :is="item.name" :data="transStyle(item)"></component>
    </div>
  </div>
</template>
<script>
import detailMix from "@/mixins/detail";
import fullScreenMix from "@/mixins/fullScreen.js";
import modules from "@/components/widgets/index.js";
export default {
  name: "PreviewPage",
  mixins: [detailMix, fullScreenMix],
  components: {
    ...modules,
  },
  data() {
    return {};
  },

  computed: {
    screenConfig() {
      const { width, height, sizeUnit = "px", fontSize, fontUnit } = this.screen;
      return {
        ...this.screen,
        width: width + sizeUnit,
        height: height + sizeUnit,
        fontSize: fontSize + fontUnit,
        transform: `scale(${this.scale}) translate(-${((1 / this.scale - 1) / 2) * 100}%, -${
          ((1 / this.scale - 1) / 2) * 100
        }%)`,
        transition: "all 0.3s",
      };
    },
  },
  methods: {
    transStyle(data) {
      const fontSize = data.fontSize && data.fontSize + (data?.fontUnit || "px");
      const borderWidth =
        data.borderWidth &&
        data.borderWidth.map(e => (e || 0) + (data?.borderUnit || "px")).join(" ");
      const borderStyle = data.borderStyle && data.borderStyle.filter(e => !!e).join(" ");
      const borderColor = data.borderColor && data.borderColor.filter(e => !!e).join(" ");
      const borderRadius =
        data.borderRadius &&
        data.borderRadius.map(e => (e || 0) + (data?.borderRadiusUnit || "px")).join(" ");
      const padding =
        data.padding && data.padding.map(e => (e || 0) + (data?.paddingUnit || "px")).join(" ");
      const width = data.width && data.width + (data.sizeUnit || "px");
      const height = data.height && data.height + (data.sizeUnit || "px");
      return {
        ...data,
        fontSize,
        borderWidth,
        borderStyle,
        borderColor,
        borderRadius,
        padding,
        width,
        height,
      };
    },
  },
};
</script>
<style scoped lang="scss"></style>
