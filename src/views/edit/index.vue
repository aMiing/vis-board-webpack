<template>
  <div class="edit-page">
    <!-- 左侧区域 -->
    <div class="left-config__panel">
      <g-drag-box
        placement="right"
        span="0"
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
    <div class="stage-center">
      <div class="screen-content">
        <div class="screen-scroll-box">
          <div ref="screen-content__wrap" class="screen-content__wrap" :style="contentStyle">
            <mainScreen
              ref="main-screen"
              :screen="screen"
              :elements="elements"
              @updateParentStyle="updateParentStyle"
              @onActivated="onWidgetActivated"
            />
          </div>
        </div>
        <!-- 缩放控制器 -->
        <div class="screen-content__operations">
          <div class="scale-label">缩放比例</div>
          <div class="scale-slider-wrap">
            <el-slider
              v-model="scale"
              :max="1"
              :min="0"
              :step="0.01"
              :show-tooltip="false"
              :marks="{ 1: '' }"
              @change="handleScaleChange"
            ></el-slider>
          </div>
          <div class="scale-value">{{ scale.toFixed(2) }}</div>
        </div>
      </div>
    </div>
    <!-- 右侧设置面板 -->
    <div class="right-config__panel">
      <g-drag-box
        placement="left"
        span="360"
        min="0"
        max="480"
        collapse-button
        collapse2min
        :drag="true"
      >
        <property-config
          :type="currentType"
          :value="screen"
          :activatedEl="activatedEl"
          :clickTarget="clickTarget"
          @updateSelectedTarget="onWidgetActivated"
        ></property-config>
      </g-drag-box>
    </div>
  </div>
</template>

<script>
import commonHeader from "./components/header";
import PropertyConfig from "./components/property-config";
import materialList from "./components/material";
import mainScreen from "./components/main-screen";
import detailMix from "@/mixins/detail";
import { mapActions, mapMutations } from "vuex";
import { debounce, cloneDeep } from "lodash";

export default {
  name: "EditPage",
  components: {
    commonHeader,
    PropertyConfig,
    materialList,
    mainScreen,
  },
  mixins: [detailMix],
  data() {
    return {
      currentType: "screen",
      contentStyle: { width: "unset", height: "unset" },
      scale: 1,
      activatedEl: null, //当前激活的组件
      clickTarget: "screen",
      propsData: {},
    };
  },
  computed: {
    pageComponents() {
      return cloneDeep(this.elements);
    },
    screenData() {
      return cloneDeep(this.screen);
    },
  },

  watch: {
    pageComponents: {
      handler(newV, oldV) {
        this.recordDataChange({ oldV, newV, type: "elements" });
      },
      deep: true,
    },
    screenData: {
      handler(newV, oldV) {
        this.recordDataChange({ oldV, newV, type: "screen" });
      },
      deep: true,
    },
  },
  created() {
    this.propsData = cloneDeep(this.screen);
  },
  mounted() {
    this.$nextTick(() => {
      this.stageResize();
    });
  },
  methods: {
    ...mapActions("panel", ["recordDataChange"]),
    updateParentStyle(scale) {
      const { width, height, sizeUnit } = this.screen;
      this.contentStyle["width"] = width * scale + sizeUnit;
      this.contentStyle["height"] = height * scale + sizeUnit;
    },
    stageResize() {
      debounce(() => {
        const { width: parentWidth, height: parentHeight } =
          this.$refs["screen-content__wrap"].getBoundingClientRect();
        const { width, height } = this.screen;
        this.scale = Math.min(parentWidth / width, parentWidth / height);
        this.$refs["main-screen"]?.updateScale(this.scale);
        this.updateParentStyle(this.scale);
      }, 300)();
    },
    handleScaleChange(val) {
      this.scale = val;
      this.$refs["main-screen"]?.updateScale(this.scale);
      this.updateParentStyle(this.scale);
    },
    onWidgetActivated(ele) {
      console.log("onWidgetActivated");
      if (ele) {
        this.activatedEl = ele;
        this.clickTarget = "widget";
      } else this.clickTarget = "screen";
    },
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
  .stage-center {
    flex: 1;
    overflow: hidden;
    margin: 20px 24px 12px;
  }
  .screen-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    .screen-scroll-box {
      flex: 1;
      overflow: auto;
    }
    .screen-content__wrap {
      position: relative;
    }
    .screen-content__operations {
      flex: 0 0 36px;
      display: flex;
      justify-content: flex-end;
      line-height: 36px;
      font-size: 12px;
      color: var(--grey-10);
      .scale-slider-wrap {
        width: 30%;
        max-width: 240px;
        min-width: 100px;
      }
      .scale-value {
        padding: 0 8px;
        width: 50px;
      }
    }
  }

  ::v-deep {
    .drag-box__content {
      overflow: hidden;
    }
  }
}
</style>
