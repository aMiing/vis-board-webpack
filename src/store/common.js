import localforage from "localforage";
const state = {
  theme: "dark",
};
const getters = {
  getTheme: state => {
    return state.theme;
  },
};
const mutations = {
  UPDATE_THEME(state, value) {
    state.theme = value;
  },
};
const actions = {
  async updateTheme({ commit }, payload) {
    const defaultTheme = payload || (await localforage.getItem("LOCAL_THEME")) || "dark";
    commit("UPDATE_THEME", defaultTheme);
    document.getElementsByTagName("html")[0].setAttribute("theme", defaultTheme);
    localforage.setItem("LOCAL_THEME", defaultTheme);
  },
};
const common = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
export default common;
