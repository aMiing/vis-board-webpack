<template>
  <div class="attr-setting">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="常规样式" name="common">
        <el-form label-width="45px">
          <template v-for="(value, key) in BaseConfig">
            <component :key="key" :is="getComponent(key)" :data="data || value.props"></component>
          </template>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="专属样式" name="custom"></el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { BaseConfig } from "@/config/widgets/base.js";
import componentTokens from "../tokens/index";
export default {
  name: "Attributes",
  components: { ...componentTokens },
  props: {
    data: {
      type: Object,
      default: () => ({
        attribute: "linesText",
        name: "test",
        id: "testid",
      }),
    },
  },
  data() {
    return {
      BaseConfig,
      activeNames: ["common"],
    };
  },
  methods: {
    getComponent(key) {
      const transMap = {
        title: "commonText",
        link: "linkConf",
      };
      return transMap[key] || key;
    },
  },
};
</script>

<style lang="scss" scoped>
.attr-setting {
  //   background-color: #1b1f25;
  .title {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ccc;
  }
  .main {
    padding: 12px;

    .size {
      display: flex;
      flex-direction: column;
      height: 70px;
      justify-content: space-between;
    }
  }
  .contain-item {
    line-height: 35px;
    height: 55px;
    padding-left: 15px;
  }
}
</style>
