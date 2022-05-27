export const menuList = [
  {
    path: "list",
    name: "home.list",
    iconCls: "fa fa-bar-chart",
    component: () => import(/* webpackChunkName: "manage" */ "@/views/pannelList.vue"),
  },
  {
    path: "examples",
    name: "home.examples",
    component: () => import(/* webpackChunkName: "examples" */ "@/views/charts/echarts.vue"),
    iconCls: "fa fa-book",
  },
];
