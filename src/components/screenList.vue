<template>
  <div class="list-content">
    <!-- <span>test</span> -->
    <el-tabs tab-position="left" style="height: 100%; background-color: #171b22; padding-top: 5px">
      <el-tab-pane>
        <span slot="label" style="display: block; width: 9vw; text-align: left">
          <i class="el-icon-menu"></i>
          全部大屏
        </span>
        <el-row class="pannelRow">
          <el-col class="pannal" title="点击新增屏幕">
            <el-card :body-style="{ padding: '0px' }">
              <div id="addPanel" style="" @click="createNewPanel">
                <div>
                  <div>
                    <i class="iconfont icon-add" style="font-size: 40px"></i>
                  </div>
                  新建可视化
                </div>
              </div>
            </el-card>
          </el-col>

          <el-col ref="pannelBox" class="pannal" v-for="(pannel, index) in panels" :key="pannel.id">
            <el-card :body-style="{ padding: '0px' }">
              <!-- 编辑功能的模态框 -->
              <div>
                <div
                  ref="dialog"
                  id="dialog"
                  @mouseover="showEdit(index)"
                  @mouseout="hiddenEdit(index)"
                  style="opacity: 0"
                >
                  <div class="dialog-modal"></div>
                  <i class="el-icon-delete" @click="deleatePannel(pannel.id)"></i>
                  <el-button type="primary" class="edit" @click="openWindow(pannel.id)">
                    编辑
                  </el-button>
                </div>
                <img :src="pannel.img" class="image" height="145" />
              </div>
              <div style="padding: 5px 10px 10px 10px">
                <div class="titlecontain" style="font-size: 16px">
                  <i class="el-icon-edit" @click="modifyPannelTitle(index)" title="编辑名称"></i>
                  <span style="line-height: 36px; padding-left: 4px">{{ pannel.title }}</span>
                </div>

                <div
                  class="line"
                  style="
                    height: 1px;
                    width: 100%;
                    border-bottom: 1px dashed #333;
                    margin-bottom: 10px;
                  "
                ></div>
                <!-- 操作按钮 -->
                <el-row type="flex" class="row-bg" justify="space-around">
                  <el-col :span="7">
                    <div class="grid-content bg-purple">
                      <i class="iconfont icon-fuzhi1" title="复制">复制</i>
                    </div>
                  </el-col>
                  <el-col :span="7">
                    <div class="grid-content bg-purple-light" @click="preview(pannel.id)">
                      <i class="iconfont icon-view" title="预览">预览</i>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-purple">
                      <el-switch
                        v-model="pannel.published"
                        :width="40"
                        active-text="发布"
                        inactive-text=""
                        disabled
                        v-if="pannel.haveContent == 0"
                        title="空界面不可发布哦"
                      ></el-switch>
                      <el-switch
                        active-color="#02710d"
                        inactive-color="#333"
                        @change="publishedOr($event, pannel.id, index)"
                        v-model="pannel.published"
                        :width="40"
                        title="发布"
                      ></el-switch>
                      <label>发布</label>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label" style="display: block; width: 9vw; text-align: left">
          <i class="el-icon-menu"></i>
          未分组
        </span>
      </el-tab-pane>
    </el-tabs>
    <createDialog ref="createNewPanelDialog" @submit="addPanel" />
  </div>
</template>

<script>
import createDialog from "./dialog/create-dialog";
export default {
  name: "ScrrenList",
  components: {
    createDialog,
  },
  data() {
    return {
      createNewPanelDialog: false,
      dialogVisible: false,
      dialogEditVisible: false,
      formLabelWidth: "120px",
      panels: [],
      theNewPannel: {
        title: "新屏幕",
        img: "../../static/img/4.jpg",
        published: 0,
      },
    };
  },

  created: function () {
    this.getPanelList();
  },

  methods: {
    getPanelList() {
      //   获取panelList
      const list = window.localStorage.getItem("panelListStr") || "[]";
      this.panels = JSON.parse(list);
    },
    createNewPanel() {
      this.$refs.createNewPanelDialog.create();
    },
    openWindow(id) {
      this.$router.push({
        name: "edit",
        query: {
          id,
        },
      });
    },
    preview(id) {
      this.$router.push({
        name: "preview",
        query: {
          id,
        },
      });
    },
    showEdit(index) {
      this.$refs.dialog[index].style.opacity = 1;
    },
    hiddenEdit(index) {
      //console.log(this.$refs.dialog[index]);
      this.$refs.dialog[index].style.opacity = 0;
      /*this.style.opacity=1;*/
    },
    deleatePannel(id) {
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
    // 数据变动之后，更新storage
    updateData() {
      const panelListStr = JSON.stringify(this.panels);
      //   存储或更新localstorage
      window.localStorage.setItem("panelListStr", panelListStr);
    },
    publishedOr(info, id, index) {
      console.log(info);
      if (info == true) {
        this.$confirm("发布之后可以通过链接分享和访问, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "发布成功!",
            });
            //ajax获取另一个服务上的数据
            let url = "http://localhost:8888/publishedOr";
            this.$http
              .post(url, { id: id, published: 1 }, { emulateJSON: true })
              .then((req, res) => {
                console.log(res.bodyText);
              })
              .catch(err => {
                console.log("未能成功发送publishedOr(1)数据，请联系系统维护人员或稍后重试！");
                return;
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消发布操作",
            });
            this.panels[index].published = false;
          });
      } else {
        this.$confirm("取消发布之后不能通过链接分享和访问, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "下架成功!",
            });
            //ajax获取另一个服务上的数据
            let url = "http://localhost:8888/publishedOr";
            this.$http
              .post(url, { id: id, published: 0 }, { emulateJSON: true })
              .then((req, res) => {
                console.log(res.bodyText);
              })
              .catch(err => {
                console.log("未能成功发送publishedOr(0)数据，请联系系统维护人员或稍后重试！");
                return;
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消下架操作",
            });
            this.panels[index].published = true;
          });
      }
    },
    getId() {
      return Math.random().toString(16).slice(2);
    },
    addPanel(data) {
      const newPanel = { ...this.theNewPannel, ...data, id: this.getId() };
      this.panels.unshift(newPanel); //本地更新面板列表
      this.updateData();
    },
    modifyPannelTitle(index) {
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

<style scoped>
#addPanel {
  padding: 75px 10px;
  text-align: center;
  line-height: 36px;
  font-size: 18px;
}
.edit {
  position: absolute;
  margin: 45px 90px;
  background-color: #6bf;
  border-color: #6bf;
  width: 60px;
  z-index: 11;
}
.el-card {
  position: absolute;
  background-color: #171b22;
  color: #ccc;
  border: 1px dashed rgba(126, 126, 126, 0.6);
  box-shadow: 0 0 2px #4bf !important;
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
.time {
  font-size: 13px;
  color: #999;
}
.el-switch__label {
  z-index: 0;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.el-switch__label {
  display: none;
}
.pannelRow {
  padding-left: 10px;
}
</style>
