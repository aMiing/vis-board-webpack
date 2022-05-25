<template>
  <el-row class="container">
    <el-col :span="24" class="banner" style="width: 100%; height: 29%; overflow: hidden">
      <el-carousel :interval="5000" indicator-position="none" arrow="never">
        <el-carousel-item v-for="item in bannerImg" :key="item.name">
          <img :src="item.img" alt="" width="100%" height="120%" />
        </el-carousel-item>
      </el-carousel>
    </el-col>
    <!-- 导航栏 -->
    <el-col :span="24" class="leader">
      <aside :class="collapsed ? 'menu-collapsed' : 'menu-expanded'">
        <!--导航菜单-->
        <el-menu
          :default-active="$route.path"
          mode="horizontal"
          class="el-menu-vertical-demo"
          @select="handleselect"
          unique-opened
          router
        >
          <el-menu-item v-for="(item, index) in menuList" :key="item.name" :index="item.path">
            <i :class="item.iconCls"></i>
            {{ item.name }}
          </el-menu-item>
        </el-menu>
        <!-- 导航菜单-折叠后 -->
      </aside>
    </el-col>
    <el-col :span="24" class="main">
      <!-- 主区域呈现 -->
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
    </el-col>
  </el-row>
</template>

<script>
const bannerImg = require("@/assets/images/banner.png");
import { menuList } from "@/router/menu";
export default {
  data() {
    return {
      menuList,
      bannerImg: [
        { name: "test1", img: bannerImg },
        { name: "test2", img: bannerImg },
        { name: "test3", img: bannerImg },
      ],
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleopen() {
      //console.log('handleopen');
    },
    handleclose() {
      //console.log('handleclose');
    },
    handleselect: function (a, b) {},
    //折叠导航栏
    collapse: function () {
      //this.collapsed=!this.collapsed;
    },
    showMenu(i, status) {
      // this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
    },
  },
  mounted() {
    var user = sessionStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      this.sysUserName = user.name || "";
      this.sysUserAvatar = user.avatar || "";
    }
  },
};
</script>
<style>
.el-carousel__container {
  height: 286px;
}
#addPannel > a {
  color: gray;
  cursor: pointer;
  text-decoration: none;
}
#addPannel:before {
  color: #43ccbf;
  text-decoration: none;
}

.el-card,
.pannal {
  width: 240px;
  height: 230px;
  margin: 10px 20px 15px 0;
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
.leader {
  display: absolute;
  z-index: 999;
}
.el-tabs__item {
  border: 1px solid #171b22;
}
.el-tabs__item.is-active {
  /* border-bottom: 1px solid rgba(60,180,255,0.1);
  	border-top: 1px solid rgba(60,180,255,0.1); */
  background: linear-gradient(to right, #000, #171b22);
  -webkit-background-clip: border-box;
  /* color: transparent;*/
}
.el-tabs__item:hover {
  /* border-bottom: 1px solid rgba(60,180,255,0.1);
  	border-top: 1px solid rgba(60,180,255,0.1); */
}
</style>

<style scoped lang="scss">
//設置小圖標
.fa-align-justify:before {
  content: "\F124";
}
/*滚动条样式*/
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 5px;
}
::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.6);
  background: rgba(0, 0, 0, 0.6);
}
//
.container {
  // background: #171b22;
  position: absolute;
  top: 0px;
  overflow-y: scroll;
  bottom: 0px;
  width: 100%;
  .leader {
    aside {
      position: absolute;
      top: 20%;
      z-index: 99;
      margin-left: 2%;
      .el-menu {
        font-size: 4vw;
        background-color: none;
        li {
          /* width:160px; */
          color: #ddd;
          font-weight: 600;
        }
      }
    }
  }
  .main {
    color: #fff;
    background: #171b22;
    position: relative;
    min-height: 100%;
    .menu-collapsed {
      flex: 0 0 60px;
      width: 60px;
    }
    .el-tabs__item:hover {
      background-color: #6bf;
    }
    .content-container {
      flex: 1;
      overflow-y: scroll;
      padding: 20px;
      .content-wrapper {
        .el-tabs--left,
        .el-tabs--right {
          color: #fff;
          .el-tabs--left .el-tabs__header.is-left {
            width: 200px;
          }
          .el-tabs--left .el-tabs__item.is-left {
            text-align: left;
          }
        }
      }
      .breadcrumb-container {
        .title {
          width: 200px;
          float: left;
          color: #475669;
        }
        .breadcrumb-inner {
          float: right;
        }
      }
      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
}
</style>
