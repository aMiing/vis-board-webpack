export const menuList = [
  {
    path: "list",
    name: "home.list",
    iconCls: "fa fa-bar-chart",
    component: () => import(/* webpackChunkName: "manage" */ "@/views/pannelList.vue"),
  },
  {
    path: "data",
    name: "home.data",
    iconCls: "fa fa-database",
    component: () => import(/* webpackChunkName: "data" */ "@/views/nav1/Form.vue"),
  },
  {
    path: "components",
    name: "home.components",
    component: () => import(/* webpackChunkName: "components" */ "@/views/nav1/user.vue"),
    iconCls: "fa fa-address-card",
  },
  {
    path: "examples",
    name: "home.examples",
    component: () => import(/* webpackChunkName: "examples" */ "@/views/charts/echarts.vue"),
    iconCls: "fa fa-book",
  },
];
