import Vue from "vue";
import Vuex from "vuex";
import editor from "./editor";
import user from "./user";
import history from "./history";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  actions: {},
  modules: {
    user,
    editor,
    history,
  },
});
