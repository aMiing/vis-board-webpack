import Vue from "vue";
import Vuex from "vuex";
import panel from "./panel";
import user from "./user";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  actions: {},
  modules: {
    user,
    panel,
  },
});
