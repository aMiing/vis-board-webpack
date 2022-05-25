<template>
  <section>
    <el-row
      style="
        line-height: 28px;
        font-size: 15px;
        font-weight: 600;
        border-bottom: 1px solid rgba(66, 66, 66, 0.9);
        padding-bottom: 5px;
        background-color: #171b22;
      "
    >
      <el-col :span="3" style="padding-left: 20px">
        <i class="el-icon-menu"></i>
        <span>我的分组</span>
      </el-col>
      <el-col :span="21" style="padding-left: 10px; color: #6bf">
        <span>大屏管理</span>
      </el-col>
    </el-row>
    <screenList />
  </section>
</template>

<script>
import screenList from "@/components/screenList";
export default {
  name: "PanelList",
  components: {
    screenList,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
i {
  cursor: pointer;
}
i:hover {
  color: #6bf;
}
</style>
