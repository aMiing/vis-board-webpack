<template>
  <div
    class="widget-box"
    ref="dragBox"
    @mousedown="(e) => handleMousedown(e, 'drag')"
    @mousemove="handleMove"
    :style="{
      width: data.width + 'px',
      height: data.height + 'px',
      top: data.posY + 'px',
      left: data.posX + 'px',
    }"
  >
    <div
      class="top"
      @mousedown.stop="(e) => handleMousedown(e, 'drag-top')"
    ></div>
    <div
      class="left"
      @mousedown.stop="(e) => handleMousedown(e, 'drag-left')"
    ></div>
    <div
      class="right"
      @mousedown.stop="(e) => handleMousedown(e, 'drag-right')"
    ></div>
    <div
      class="bottom"
      @mousedown.stop="(e) => handleMousedown(e, 'drag-bottom')"
    ></div>
    <div class="leftTop"></div>
    <div class="leftBottom"></div>
    <div class="rightTop"></div>
    <div class="rightBottom"></div>

    <slot></slot>
  </div>
</template>
<script>
import { throttle } from "lodash";

const moveCore = throttle(
  ({ clientX = 0, clientY = 0, target, disX, disY, height = 0, width = 0 }) => {
    const { x, y } = target.parentNode.getBoundingClientRect();
    target.style.left = clientX - x - disX + "px";
    target.style.top = clientY - y - disY + "px";
    // target.style.height = height + disY + "px";
    // target.style.width = width + disX + "px";
  },
  0
);
export default {
  props: {
    data: {
      type: Object,
      default: () => ({
        width: 120,
        height: 120,
      }),
    },
  },
  data() {
    return {
      operating: false,
      lastX: this.$props.data.posX,
      lastX: this.$props.data.posY,
      disX: 0,
      disY: 0,
      target: null,
    };
  },
  async mounted() {
    window.addEventListener("mouseup", () => {
      this.operating = false;
    });
    // window.addEventListener("mousemove", (e) => {
    //   this.handleMove(e);
    // });
    await this.$nextTick();
    this.target = this.$refs.dragBox;
  },
  beforeDestroy() {
    window.removeEventListener("mouseup", () => {
      this.operating = false;
    });

    // window.removeEventListener("mousemove", (e) => {
    //   this.handleMove(e);
    // });
  },
  methods: {
    handleMousedown({ clientX, clientY }, type) {
      // console.log('type', type);
      this.operating = type;
      const { x, y } = this.$refs.dragBox.getBoundingClientRect();
      this.disX = clientX - x;
      this.disY = clientY - y;
    },
    handleMove({ clientX, clientY }) {
      if (this.operating) {
        moveCore({
          clientX,
          clientY,
          target: this.target,
          disX: this.disX,
          disY: this.disY,
        });
        // switch (this.operating) {
        //   case "drag":
        //     moveCore({
        //       clientX,
        //       clientY,
        //       target: this.target,
        //       disX: this.disX,
        //       disY: this.disY,
        //     });

        //   case "drag-top":
        //     moveCore({
        //       clientY,
        //       target: this.target,
        //       disY: -this.disY,
        //       height: this.data.height,
        //     });
        //     break;

        //   default:
        //     break;
        // }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.widget-box {
  position: absolute;
  //   top: 40%;
  //   left: 40%;
  //   & > div:last-child {
  //     position: absolute;
  //   }
  &::before {
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0;
    // z-index:
  }
  &:hover {
    cursor: all-scroll;
    z-index: 9999;
    &::before {
      opacity: 0.15;
      border: 1px dashed #eee;
      top: -1px;
      left: -1px;
    }
  }
  .top,
  .bottom {
    position: absolute;
    width: 100%;
    height: 5px;
    background: red;
    left: 0;
    cursor: ns-resize;
  }
  .top {
    top: 0;
  }
  .bottom {
    bottom: 0;
  }
  .right,
  .left {
    position: absolute;
    width: 5px;
    height: 100%;
    background: green;
    top: 0;
    cursor: ew-resize;
  }
  .left {
    left: 0;
  }
  .right {
    right: 0;
  }
  .leftTop,
  .leftBottom,
  .rightTop,
  .rightBottom {
    position: absolute;
    width: 8px;
    height: 8px;
    background: blue;
  }
  .leftTop {
    top: 0;
    left: 0;
    cursor: nw-resize;
  }
  .leftBottom {
    left: 0;
    bottom: 0;
    cursor: sw-resize;
  }
  .rightTop {
    top: 0;
    right: 0;
    cursor: ne-resize;
  }
  .rightBottom {
    right: 0;
    bottom: 0;
    cursor: se-resize;
  }
}
</style>