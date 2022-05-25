<template>
  <!-- 操作面板 -->
  <div class="screen" ref="screen" :style="screenConfig" @click="loadSetting('screen')">
    <vue-drag-resize-rotate
      v-for="item in pageComponents"
      :key="item.id"
      :parent="true"
      :grid="[20, 20]"
      :rotatable="true"
      :w="item.width"
      :h="item.height"
      :x="item.posX"
      :y="item.posY"
      :r="item.romate"
      @resizing="(x, y, w, h) => resizing({ x, y, w, h }, item)"
    >
      <div class="component-event" @click.stop="loadSetting('widget', item.id)">
        <component :is="item.name" :data="item"></component>
      </div>
    </vue-drag-resize-rotate>
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

import screen from "@/configs/screen.js";
import { mapGetters } from "vuex";
import { debounce } from "lodash";
export default {
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
      screen,
      scale: 1,
      resizeDebounce: debounce(this.stageResize, 300),
      gridColor: "rgba(255, 255, 255, 0.6)",
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
        transform: `scale(${this.scale}) translate(-${((1 / this.scale - 1) / 2) * 100}%, -${((1 / this.scale - 1) / 2) * 100}%)`,
        transition: "all 0.3s",
      };
    },
  },
  mounted() {
    this.resizeDebounce();
    //   监听resize，缩放画布
    window.addEventListener("resize", this.resizeDebounce);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeDebounce);
  },
  methods: {
    stageResize() {
      const { width, height } = this.$refs.screen.parentNode.getBoundingClientRect();
      this.scale = Math.min(width / this.screen.width, height / this.screen.height);
      // console.log("width", width, this.scale);
    },

    loadSetting(type, id = "") {
      this.$emit("updateActive", { type, id });
    },

    resizing({ x, y, w, h }, item) {
      // item.posX = x;
      // item.posY = y;
      item.width = w;
      item.height = h;
    },
  },
};
</script>
<style lang="scss" scoped>
.screen {
  background: linear-gradient(-90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px) 0% 0% / 20px 20px,
    linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px) 0% 0% / 20px 20px;
}
</style>
<style>
.vdr {
  cursor: move;
}
</style>
