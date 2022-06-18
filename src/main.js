import Vue from "vue";
import App from "./App";
import VCharts from "v-charts";
import store from "@/store/index.js";
import VueRouter from "vue-router";
import routeList from "@/router/index.js";
import VueResource from "vue-resource";
import localforage from "localforage";
localforage.config({ name: "vis-board" });
import "./plugins";
import "@/femc/themes/index";

Vue.use(VueResource);

Vue.use(VCharts);
Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: routeList,
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
