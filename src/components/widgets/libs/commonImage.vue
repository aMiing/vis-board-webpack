<template>
  <div class="image">
    <el-image :style="data" :src="url" :fit="data.objectaFit"></el-image>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss">
.timer {
  position: absolute;
  width: 100%;
  display: table;
  text-align: center;
  height: 100%;
}
</style>
