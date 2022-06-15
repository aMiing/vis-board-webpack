<template>
  <div class="header-bar">
    <div :span="4" class="logo-content" :class="collapsed ? 'logo-collapse' : ''">
      <span class="big-logo">{{ collapsed ? "" : sysName }}</span>
      <span class="version">v1.0.0尝鲜版</span>
    </div>

    <div v-if="isEdit" class="operations-group">
      <operator-group :options="btnList" :iconOnly="true"></operator-group>
    </div>
    <div class="userinfo">
      <el-dropdown trigger="hover">
        <span class="el-dropdown-link userinfo-inner">欢迎你 {{ getUserInfo.userName }}</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>修改密码</el-dropdown-item>
          <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import operatorGroup from "@/components/operator-group/index.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "HeaderBar",
  components: { operatorGroup },
  data() {
    return {
      btnList: [
        {
          name: "保存",
          iconClass: "icon-baocun",
          click: () => this.save(),
          disabled: {
            cb: () => this.noNeedBeSave,
            tips: "无变更需要保存",
          },
        },
        {
          name: "上一步",
          iconClass: "icon-houtui-shi",
          click: () => this.undo(),
          disabled: {
            cb: () => !this.currentHistoryIndex,
            tips: "没有上一步了~",
          },
        },
        {
          name: "下一步",
          iconClass: "icon-qianjin-shi",
          click: () => this.redo(),
          disabled: {
            cb: () => this.currentHistoryIndex >= this.historyLength - 1,
            tips: "已经是最后一步了",
          },
        },
        {
          name: "发布",
          iconClass: "icon-fabu",
          click: row => console.log(row),
        },
        {
          name: "预览",
          iconClass: "icon-yulan",
          click: row => console.log(row),
        },
      ],
      sysName: "VMS-BD",
      collapsed: false,
      sysUserName: "amingxiansen",
      sysUserAvatar: "",
    };
  },
  computed: {
    ...mapGetters("user", ["getUserInfo"]),
    ...mapGetters("panel", {
      screen: "screenData",
      changed: "changed",
    }),
    ...mapGetters("history", [
      "isLastHistory",
      "isFirstHistory",
      "noHistory",
      "noNeedBeSave",
      "currentHistoryIndex",
      "historyLength",
    ]),
    isEdit() {
      return this.$route?.name === "edit";
    },
    id() {
      return this.$route?.query?.id;
    },
  },
  methods: {
    ...mapActions("panel", ["saveData"]),
    ...mapActions("history", { undo: "undo", redo: "redo" }),
    //退出登录
    logout: function () {
      this.$confirm("确认退出吗?", "提示", {
        type: "warning",
      })
        .then(() => {
          sessionStorage.removeItem("user");
          this.$router.push("/login");
        })
        .catch(() => {});
    },
    async save() {
      await this.saveData();
      this.$message.success("保存成功！");
    },
  },
};
</script>
<style scoped lang="scss">
.header-bar {
  position: fixed;
  width: 100%;
  height: 36px;
  line-height: 36px;
  z-index: 99;
  background: var(--grey-8);
  color: #fff;
  display: flex;
  justify-content: space-between;
  .logo-content {
    // text-align: center;
    padding: 0 20px;
    flex: 1;
    .big-logo {
      font-size: 20px;
    }
  }
  .operations-group {
    text-align: right;
    // padding: 0 12px;
  }
  .userinfo {
    padding: 0 12px;
    .userinfo-inner {
      cursor: pointer;
      color: #fff;
      img {
        width: 20px;
        height: 20px;
        border-radius: 10px;
        margin: 5px;
        float: right;
      }
    }
  }
  .logo-collapse {
    width: 60px;
  }
}
</style>
