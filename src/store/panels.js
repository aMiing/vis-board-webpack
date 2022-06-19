import localforage from "localforage";
const state = {
  list: [],
};
const getters = {
  getList(state) {
    return state.list;
  },
};
const mutations = {
  setList(state, value) {
    // state.list.push(...value);
    state.list = value;
  },
  addList(state, value) {
    state.list.unshift(value);
  },
  deleteItem(state, value) {
    const index = state.list.findIndex(e => e.id === value);
    state.list.splice(index, 1);
  },
};

const actions = {
  async getPanelList({ commit }) {
    const list = await localforage.getItem("panelList");
    commit("setList", list || []);
  },
  async addList({ state, commit }, value) {
    commit("addList", value);
    await localforage.setItem("panelList", state.list);
  },
  async deleteDataById({ commit }, id) {
    commit("deleteItem", id);
    await localforage.setItem("panelList", state.list);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
