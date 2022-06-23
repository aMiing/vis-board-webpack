<template>
  <div class="publish-dialog">
    <el-dialog title="发布" :visible.sync="visible" append-to-body>
      <el-alert
        title="即将基于当前页面状态发布，发布后将可以通过专属连接访问。"
        type="info"
        :closable="false"
      ></el-alert>
      <el-button type="primary" @click="publish">立即发布</el-button>
      <div v-show="url" class="link-wrap">
        <span>链接地址：</span>
        <el-link :href="url" target="_blank">{{ url }}</el-link>
        <el-link :underline="false">
          <i class="iconfont icon-copy"></i>
        </el-link>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "Publish",
  data() {
    return {
      visible: false,
      url: "",
    };
  },
  methods: {
    ...mapActions("editor", ["publishNow"]),
    show(data) {
      this.visible = true;
      console.log("publish", data);
    },
    async publish() {
      const url = await this.publishNow();
      console.log("url", url);
      this.url = url;
    },
    openNewTab(url) {},
  },
};
</script>
<style scoped lang="scss"></style>
