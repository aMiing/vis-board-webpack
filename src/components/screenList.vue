<template>
  <div class="screen-list">
    <div class="menu-content">
      <el-tabs tab-position="left">
        <el-tab-pane label="全部大屏"></el-tab-pane>
        <el-tab-pane label="未分组"></el-tab-pane>
      </el-tabs>
    </div>

    <div class="card-list-content">
      <GtCardList :cardList="panels" :showState="false" :rowMaxNum="6">
        <template v-slot:operator="{ card }">
          <div class="model-item-row mt-8">
            <div class="viewCount">
              <i class="iconfont icon-yulan"></i>
              <span class="count">{{ card.viewCount || 0 }}</span>
            </div>

            <div class="follow-content">
              <el-link :underline="false" @click="clickFollow(card)">
                <i
                  class="iconfont"
                  :class="card.followed ? 'icon-shoucang' : 'icon-shoucang-weidianji'"
                ></i>
              </el-link>
            </div>
          </div>
        </template>
        <template v-slot:mode_operation="{ card }">
          <div class="modal_operation__modal" v-if="operationList.length">
            <operator-group :options="operationList" :data="card"></operator-group>
          </div>
        </template>
        <template v-slot:preview="{ card }">
          <img :src="card.img" class="preview-img" alt="预览图片" />
        </template>
      </GtCardList>
    </div>
  </div>
</template>

<script>
import GtCardList from "./gt-card-list/index.vue";
import operatorGroup from "@/components/operator-group/";
import { mapGetters } from "vuex";
import screenConfig from "@/config/screen.js";
const defaultImg = require("@/assets/images/bg.png");

export default {
  name: "ScrrenList",
  components: {
    GtCardList,
    operatorGroup,
  },
  data() {
    return {
      createNewPanelDialog: false,
      dialogVisible: false,
      dialogEditVisible: false,
      formLabelWidth: "120px",
      panels: [],
      theNewPanel: {
        title: "新屏幕",
        img: defaultImg,
        published: 0,
      },

      operationList: [
        {
          id: 1,
          name: "编辑",
          iconClass: "icon-bianji",
          hidden: row => row.type === "1",
          click: row => this.goNextPage("edit", row),
        },
        {
          id: 3,
          name: "预览",
          iconClass: "icon-yulan",
          hidden: row => row.type === "1",
          click: row => this.goNextPage("preview", row),
        },
        {
          id: 2,
          name: "删除",
          iconClass: "icon-shanchu",
          hidden: row => row.type === "1",
          click: row => this.deleatePanel(row),
        },
      ],
    };
  },
  computed: {
    ...mapGetters("user", ["getUserInfo"]),
  },

  mounted() {
    this.getPanelList();
  },

  methods: {
    addPanel(data) {
      const newPanel = {
        ...screenConfig,
        ...this.theNewPanel,
        ...data,
        id: this.getId(),
        createTime: new Date().getTime(),
        creator: this.getUserInfo?.userName,
        viewCount: 0,
        followed: 0,
      };

      console.log("newPanel", newPanel);
      this.panels.unshift(newPanel); //本地更新面板列表
      this.updateData();
    },

    getId() {
      return Math.random().toString(16).slice(2);
    },
    // 数据变动之后，更新storage
    updateData() {
      const panelListStr = JSON.stringify(this.panels);
      //   存储或更新localstorage
      window.sessionStorage.setItem("panelListStr", panelListStr);
    },

    getPanelList() {
      //   获取panelList
      const list = window.sessionStorage.getItem("panelListStr") || "[]";
      this.panels = JSON.parse(list);
    },

    deleatePanel({ id }) {
      this.$confirm("此操作将删除该面板, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const index = this.panels.findIndex(e => e.id === id);
        this.panels.splice(index, 1);
        //    更新数据
        this.updateData();
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      });
    },
    clickFollow(row) {
      if (row.followed) {
        row.followed = 0;
        this.$message.info("已取消收藏");
      } else {
        row.followed = 1;
        this.$message.success("收藏成功！");
      }
    },

    goNextPage(name, row) {
      this.$router.push({
        name,
        query: {
          id: row.id,
        },
      });
    },
    modifyPanelTitle(index) {
      this.$prompt("请输入新标题", "修改屏幕标题", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "标题成功修改为: " + value,
          });
          this.panels[index].title = value;
          //ajax向后台发送修改数据
          let url = "http://localhost:8888/changeTitle";
          this.$http
            .post(url, { id: this.panels[index].id, value: value }, { emulateJSON: true })
            .then((req, res) => {
              console.log("保存修改到服务器");
            })
            .catch(err => {
              alert("页面数据可能与数据库不完全匹配，请刷新页面或联系系统维护人员！");
              return;
            });
          //定义一个提交修改的函数，这里调用
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消修改",
          });
        });
    },
  },
};
</script>

<style scoped lang="scss">
.screen-list {
  display: flex;
  flex: 1;
  overflow: hidden;
  .menu-content {
    flex: 0 0 120px;
  }
  .follow-content {
    .icon-shoucang {
      color: var(--yellow-6);
    }
  }
  .card-list-content {
    flex: 1;
    overflow: auto;

    .iconfont {
      font-size: 20px;
      cursor: pointer;
    }
    .preview-img {
      width: 100%;
      height: 100%;
      object-fit: scale-down;
    }
    .model-item-row {
      padding: 4px 0;
      display: flex;
      justify-content: space-between;
      height: 28px;
      line-height: 20px;
      .viewCount {
        color: var(--grey-11);
        .iconfont {
          vertical-align: bottom;
        }
        .count {
          padding: 0 4px;
        }
      }
    }

    .modal_operation__modal {
      position: absolute;
      width: 100%;
      height: 100%;
      background: var(--grey-1);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      color: var(--grey-11);
      font-size: var(--font-size-s);
      &.active {
        opacity: 0.8;
        transition: all 0.3s;
      }
      &:hover {
        opacity: 0.8;
        transition: all 0.3s;
      }
    }
  }
}
.edit {
  position: absolute;
  margin: 45px 90px;
  background-color: #6bf;
  border-color: #6bf;
  width: 60px;
  z-index: 11;
}

#dialog > i {
  position: absolute;
  margin: 5px 215px;
  font-size: 18px;
  z-index: 11;
  color: #fff;
}
.dialog-modal {
  position: absolute;
  width: 240px;
  height: 145px;
  z-index: 9;
  background-color: #000;
  opacity: 0.8;
}
</style>
