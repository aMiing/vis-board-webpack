import Vue from "vue";
import App from "./App";
import VCharts from "v-charts";
// import ElementUI from "element-ui";
import "@/femc/themes/index";
import store from "@/store/index.js";
import VueRouter from "vue-router";
import routeList from "@/router/index.js";
import VueResource from "vue-resource";
import "./plugins";

Vue.use(VueResource);
// Vue.use(ElementUI, { size: "small", zIndex: 3000 });

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
