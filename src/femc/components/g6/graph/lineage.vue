<template>
  <div class="g-graph-lineage">
    <div :id="graphContainer" class="g-graph-container" onselectstart="return false;"></div>
  </div>
</template>
<script>
import './src/register/lineage';
import { GGraph } from './src';
export default {
  name: 'GGraphLineage',
  props: {
    option: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      graphContainer: 'g-graph-container',
      g6Instance: null,
      events: [],
    };
  },
  watch: {
    option: {
      handler() {
        this.initGraph();
      },
      immediate: true,
    },
  },
  mounted() {
    window.addEventListener('resize', this.resize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
    this.destroy();
  },
  methods: {
    initEvent() {
      for (const [eventType, callback] of Object.entries(this.$listeners)) {
        const func = function (event) {
          callback(event);
        };
        this.g6Instance.on(eventType, func);
        this.events.push(() => {
          this.g6Instance.off(eventType, func);
        });
      }
    },
    resize() {
      const dom = document.getElementById(this.graphContainer);
      const { clientWidth, clientHeight } = dom;
      this.g6Instance && this.g6Instance.changeSize(clientWidth, clientHeight);
    },
    async initGraph() {
      await this.$nextTick();
      this.destroy();
      const dom = document.getElementById(this.graphContainer);
      const { clientWidth, clientHeight } = dom;
      this.g6Instance = new GGraph(
        'lineage',
        Object.assign(
          {
            container: dom,
            height: clientHeight,
            width: clientWidth,
          },
          this.option
        )
      );
      this.initEvent();
      this.$emit('ready', this.g6Instance);
    },
    destroy() {
      this.events.forEach(func => {
        func();
      });
      this.events = [];
      this.g6Instance && this.g6Instance.destroy();
    },
  },
};
</script>
<style lang="scss">
.g-graph-lineage {
  width: 100%;
  height: 100%;
  position: relative;
  .g-graph-container {
    position: relative;
    width: 100%;
    height: 100%;
  }
}
</style>
