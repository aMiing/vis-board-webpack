<template>
  <div class="container">
    <div class="banner">
      <el-carousel :interval="5000" indicator-position="none" arrow="never">
        <el-carousel-item v-for="item in bannerImg" :key="item.name">
          <img :src="item.img" alt="" width="100%" height="120%" />
        </el-carousel-item>
      </el-carousel>

      <!-- 导航栏 -->
      <aside class="menu-expanded">
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
    </div>
    <!-- 主区域呈现 -->
    <div class="content-container">
      <router-view></router-view>
    </div>
  </div>
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
<style scoped lang="scss">
.container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--grey-1);
  display: flex;
  flex-direction: column;
  .banner {
    width: 100%;
    height: 29%;
    overflow: hidden;
  }

  .menu-expanded {
    position: absolute;
    top: 20%;
    z-index: 99;
    margin-left: 2%;
    .el-menu {
      font-size: 4vw;
      background-color: none;
      li {
        /* width:160px; */
        font-weight: 600;
      }
    }
  }

  .content-container {
    flex: 1;
    overflow: hidden;
    padding: 8px 16px;
  }
}
</style>
