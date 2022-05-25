<template>
  <div class="widget">
    <el-collapse v-model="activeNames" accordion>
      <el-collapse-item
        v-for="(group, index) in widgetConfig"
        :key="index"
        :title="group.label + `(${group.widgets.length})`"
        :name="group.name"
        :disabled="!group.widgets || !group.widgets.length"
      >
        <div class="charts-content">
          <div
            class="chart"
            v-for="widget in group.widgets"
            :key="widget.name"
            @click="UseIt(widget)"
          >
            <img class="chart-img" :src="widget.img" />
            <div class="chart-label">{{ widget.label }}</div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import { widgetConfig } from "./config/widget";
export default {
  name: "Widget",
  data() {
    return {
      activeNames: "",
      widgetConfig,
    };
  },
  methods: {},
};
</script>
<style scoped lang="scss">
.widget {
  ::v-deep {
    .el-collapse-item__header {
      padding: 0 16px;
    }
  }
  .charts-content {
    padding: 0 8px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .chart {
      flex: 0 0 130px;
      height: 108px;
      margin: 4px 6px;
      text-align: center;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      border-radius: 8px;
      box-shadow: 1px 1px 2px var(--grey-2);

      &:hover,
      &.active {
        box-shadow: 0 0 4px var(--grey-10);
      }
      .chart-img {
        width: 100%;
        height: 82px;
        object-fit: cover;
      }
      .chart-label {
      }
    }
  }
}
</style>
