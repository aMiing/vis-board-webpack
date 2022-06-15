<template>
  <div
    class="screen"
    ref="screen"
    :style="screenConfig"
    @click="switchSettingType()"
    @dragover="dragover"
    @drop="drop"
  >
    <vue-drag-resize-rotate
      v-for="item in elements"
      class-name="drag-box"
      :key="item.id"
      :parent="true"
      :grid="[20, 20]"
      :rotatable="true"
      :w="item.width"
      :h="item.height"
      :x="item.posX"
      :y="item.posY"
      :r="item.romate"
      :z-index="item.zIndex"
      :minHeight="30"
      :minWidth="30"
      :lock-aspect-ratio="lockRatio"
      :snap="true"
      :snapTolerance="15"
      @activated="onActivated(item)"
      @deactivated="onDeactivated(item)"
      @resizestop="(x, y, w, h) => resizestop({ x, y, w, h }, item)"
      @dragstop="(x, y) => onDrag(x, y, item)"
      @rotatestop="romate => onRotating(romate, item)"
      @refLineParams="getRefLineParams"
    >
      <div class="component-event" @click.stop="switchSettingType(item)">
        <component :is="item.name" :data="transStyle(item)"></component>
      </div>
    </vue-drag-resize-rotate>
    <span
      class="ref-line v-line"
      v-for="(item, index) in vLine"
      :key="'v_' + index"
      v-show="item.display"
      :style="{
        left: item.position,
        top: item.origin,
        height: item.lineLength,
      }"
    />
    <span
      class="ref-line h-line"
      v-for="(item, index) in hLine"
      :key="'h_' + index"
      :style="{ top: item.position, left: item.origin, width: item.lineLength }"
    />
  </div>
</template>

<script>
import VueDragResizeRotate from "@gausszhou/vue-drag-resize-rotate";
import modules from "@/components/widgets/index.js";
import { cloneDeep } from "lodash";

import { mapGetters, mapActions } from "vuex";
export default {
  name: "MainScreen",
  props: {
    screen: {
      type: Object,
      default: () => ({}),
    },
    elements: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    VueDragResizeRotate,
    ...modules,
  },

  data() {
    return {
      scale: 1,
      gridColor: "rgba(255, 255, 255, 0.6)",
      lockRatio: false, //变换组件纵横比锁定

      vLine: [],
      hLine: [],
    };
  },
  computed: {
    ...mapGetters("history", ["isLastHistory"]),
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
    ...mapActions("panel", ["addElements"]),
    getBoxSize(value) {
      return value + 2;
    },
    updateScale(scale) {
      this.scale = scale;
    },

    switchSettingType(widget) {
      this.$emit("onActivated", widget);
    },

    resizestop({ x, y, w, h }, item) {
      item.posX = x;
      item.posY = y;
      item.width = w;
      item.height = h;
    },
    dragover(event) {
      // 阻止浏览器的默认事件
      event.preventDefault();
    },
    drop(event) {
      // 获取组件数据
      const data = event.dataTransfer.getData("text/plain");
      // 获取组件拖动到舞台上的相对位置
      const { layerX, layerY } = event;
      const config = JSON.parse(data);
      const widget = {
        ...config,
        posX: layerX / this.scale,
        posY: layerY / this.scale,
      };
      this.addElements(widget);
      event.preventDefault();
    },

    onActivated(widget) {
      // this.$emit("onActivated", widget);
    },
    onDeactivated(widget) {
      // console.log("widget onDeactivated", widget);
      // this.$emit("onActivated", null);
    },
    onDrag(x, y, item) {
      item.posX = x;
      item.posY = y;
    },
    onRotating(romate, item) {
      item.romate = romate;
    },

    getRefLineParams(params) {
      const { vLine, hLine } = params;
      this.vLine = vLine;
      this.hLine = hLine;
    },

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
<style lang="scss" scoped>
.screen {
  background: linear-gradient(-90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px) 0% 0% / 20px
      20px,
    linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px) 0% 0% / 20px 20px;
}
.drag-box {
  cursor: pointer;
  touch-action: none;
  position: absolute;
  box-sizing: border-box;
  border: 1px dashed;
  // &.active {
  //   border: 1px dashed;
  // }
}

.ref-line {
  position: absolute;
  background-color: rgb(219, 89, 110);
  z-index: 9999;
}
.v-line {
  width: 1px;
}
.h-line {
  height: 1px;
}
</style>
