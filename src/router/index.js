import Login from "@/views/Login.vue";
import NotFound from "@/views/404.vue";
import Home from "@/views/Home.vue";
import Index from "@/views/index.vue";
import { menuList } from "./menu.js";

const routeList = [
  {
    path: "/",
    name: "root",
    component: Index,
    redirect: { name: "home.list" },
    children: [
      {
        path: "home",
        name: "home",
        component: Home,
        redirect: { name: "home.list" },
        children: menuList,
      },
      {
        path: "edit",
        name: "edit",
        component: () => import(/* webpackChunkName: "edit"  */ "@/views/edit/index.vue"),
        meta: {
          title: "看板制作",
        },
      },
    ],
  },

  {
    path: "preview",
    name: "preview",
    component: () => import(/* webpackChunkName: "preview" */ "@/views/preview/index.vue"),
    meta: {
      title: "预览",
    },
  },

  {
    path: "/login",
    component: Login,
    name: "login",
  },
  {
    path: "/404",
    component: NotFound,
    name: "404",
  },
];

export default routeList;
