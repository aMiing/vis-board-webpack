<template>
  <div class="setting-content">
    <div class="screen-title">屏幕名称：{{ screenConfig.title || "--" }}</div>
    <div class="main">
      <el-form ref="form" :model="screenConfig" label-width="80px">
        <el-form-item label="屏幕大小">
          <div class="size">
            <div class="width">
              <span>宽度</span>
              <el-input-number
                v-model="screenConfig.width"
                size="small"
                :min="975"
                :max="4000"
              ></el-input-number>
            </div>
            <div class="height">
              <span>高度</span>
              <el-input-number
                v-model="screenConfig.height"
                size="small"
                :min="400"
                :max="2200"
              ></el-input-number>
            </div>
          </div>
        </el-form-item>

        <el-form-item label="背景颜色">
          <el-color-picker
            v-model="screenConfig.backgroundColor"
            show-alpha
            :predefine="predefineColors"
          ></el-color-picker>
        </el-form-item>
        <el-form-item label="背景图片">
          <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/">
            <el-button>上传</el-button>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>

        <el-form-item label="缩放方式">
          <el-select v-model="screenConfig.zoomType" placeholder="请选择">
            <el-option
              v-for="item in zoomType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="封面样式">
          <div class="screenshot">
            <img
              :src="screenShot"
              class="screenshot__img"
              alt="背景图片"
              width="180"
              height="120"
            />
            <el-button type="primary" plain class="screenshot__btn">截取封面</el-button>
          </div>
        </el-form-item>
        <el-form-item label="網格间距">
          <el-input-number
            v-model="screenConfig.grideSpace"
            size="small"
            :precision="1"
            :step="1"
            :max="50"
          ></el-input-number>
        </el-form-item>
      </el-form>

      <div class="operation-content">
        <el-button type="primary" plain>重置</el-button>
        <el-button type="primary" plain>恢复默认背景</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import screenConfig from "@/configs/screen";
const screenShot = require("@/assets/images/bg.png");
export default {
  data() {
    return {
      screenConfig,
      screenShot,
      screenSet: {},
      screenWidth: 600,
      screenHeight: 400,
      zoomType: "fill-width",
      Space: 5,
      predefineColors: [
        "#ff4500",
        "#ff8c00",
        "#ffd700",
        "#90ee90",
        "#00ced1",
        "#1e90ff",
        "#c71585",
        "rgba(255, 69, 0, 0.68)",
        "rgb(255, 120, 0)",
        "hsv(51, 100, 98)",
        "hsva(120, 40, 94, 0.5)",
        "hsl(181, 100%, 37%)",
        "hsla(209, 100%, 56%, 0.73)",
        "#c7158577",
      ],
      zoomType: [
        {
          value: "fill-width",
          label: "等比缩放宽度铺满",
        },
        {
          value: "fill-height",
          label: "等比缩放高度铺满",
        },
        {
          value: "fill-screen",
          label: "全屏铺满",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.setting-content {
  position: relative;
  height: 100%;
  min-width: 270px;
}
.screen-title {
  margin: 0;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-bottom: 1px solid #ccc;
}
.main {
  padding: 12px 12px 24px;
  font-size: 12px;
  overflow-y: auto;
  height: calc(100% - 40px);

  .size {
    display: flex;
    flex-direction: column;
    height: 70px;
    justify-content: space-between;
  }
  .operation-content {
    text-align: center;
  }
}
.screenshot {
  position: relative;
  .screenshot__img {
    object-fit: scale-down;

    width: 100%;
    height: 100%;
  }
  .screenshot__btn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
