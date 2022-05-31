<template>
  <!-- 操作面板 -->

  <div
    class="screen"
    ref="screen"
    :style="screenConfig"
    @click="loadSetting('screen')"
    @dragover="dragover"
    @drop="drop"
  >
    <vue-drag-resize-rotate
      v-for="item in pageComponents"
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
      @resizing="(x, y, w, h) => resizing({ x, y, w, h }, item)"
      @activated="onActivated(item)"
      @deactivated="onDeactivated(item)"
      @dragging="onDrag"
      @rotating="onRotating"
      @refLineParams="getRefLineParams"
    >
      <div class="component-event" @click.stop="loadSetting('widget', item.id)">
        <component :is="item.name" :data="item"></component>
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
import CommonText from "@/components/widgets/CommonTitle";
import linesText from "@/components/widgets/linesText";
import scrollText from "@/components/widgets/scrollText";
import Time from "@/components/widgets/Time";
import scrollCards from "@/components/widgets/scrollCards";
import lineChart from "@/components/widgets/lineChart";
import radarChart from "@/components/widgets/radarChart";
import barChart from "@/components/widgets/barChart";
import horizontalBarChart from "@/components/widgets/horizontalBarChart";
import pieChart from "@/components/widgets/pieChart";
import ringChart from "@/components/widgets/ringChart";
import pointChart from "@/components/widgets/pointChart";
import mapChart from "@/components/widgets/mapChart";
import dashbord from "@/components/widgets/dashbord";
import seriesDashbord from "@/components/widgets/seriesDashbord";
import borderWidget from "@/components/widgets/border";
import iconFont from "@/components/widgets/iconFont";

import { mapGetters, mapActions } from "vuex";
export default {
  name: "MainScreen",
  props: {
    screen: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    VueDragResizeRotate,
    CommonText,
    linesText,
    Time,
    scrollText,
    scrollCards,
    lineChart,
    radarChart,
    barChart,
    horizontalBarChart,
    pieChart,
    ringChart,
    pointChart,
    mapChart,
    dashbord,
    seriesDashbord,
    borderWidget,
    iconFont,
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
    ...mapGetters("panel", {
      pageComponents: "getElements",
    }),
    screenConfig() {
      const { width, height, fontSize, whUnit = "", fontUnit = "" } = this.screen;
      return {
        // background: `linear-gradient(-90deg, ${this.gridColor} 1px, transparent 1px) 0% 0% / 20px 20px, linear-gradient(${this.gridColor} 1px, transparent 1px) 0% 0% / 20px 20px;`,
        ...this.screen,
        width: width + whUnit,
        height: height + whUnit,
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
    updateScale(scale) {
      this.scale = scale;
    },

    loadSetting(type, id = "") {
      this.$emit("updateActive", { type, id });
    },

    resizing({ x, y, w, h }, item) {
      // console.log("resizing");
      // item.posX = x;
      // item.posY = y;
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
        posX: layerX / this.scale - (config.width || 0) / 2,
        posY: layerY / this.scale - (config.height || 0) / 2,
      };
      this.addElements(widget);
      event.preventDefault();
    },

    onActivated(widget) {
      console.log("widget active", widget);
    },
    onDeactivated(widget) {
      console.log("widget onDeactivated", widget);
    },
    onDrag(x, y) {
      // console.log("drag--");
      console.log("x, y", x, y);
    },
    onRotating(degree) {
      console.log("onRotating: degree", degree);
    },

    getRefLineParams(params) {
      const { vLine, hLine } = params;
      this.vLine = vLine;
      this.hLine = hLine;
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
