<template>
  <el-form-item label="时间格式">
    <div class="time-formatter">
      <el-select v-model="defaultValue" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
  </el-form-item>
</template>
<script>
export default {
  name: "TimeFormatter",
  data() {
    return {
      defaultValue: "YYYY/MM/DD hh:mm:ss",

      options: [
        {
          value: "YYYY/MM/DD hh:mm:ss",
          label: "年/月/日 时:分:秒",
        },
        {
          value: "YYYY/MM/DD hh:mm",
          label: "年/月/日 时:分",
        },
        {
          value: "YYYY/MM/DD",
          label: "年/月/日",
        },
        {
          value: "YYYY-MM-dd hh:mm:ss",
          label: "年-月-日 时:分:秒",
        },
        {
          value: "YYYY-MM-dd hh:mm",
          label: "年-月-日 时:分",
        },
        {
          value: "YYYY-MM-dd",
          label: "年-月-日",
        },
        {
          value: "YYYY.MM.dd hh:mm:ss",
          label: "年.月.日 时:分:秒",
        },
        {
          value: "YYYY.MM.dd hh:mm",
          label: "年.月.日 时:分",
        },
        {
          value: "YYYY.MM.dd",
          label: "年.月.日",
        },
      ],
    };
  },
  methods: {},
};
</script>
<style scoped lang="scss"></style>
