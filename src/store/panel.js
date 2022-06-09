const state = {
  elements: [],
  data: {},
  panelId: "",
};
const getters = {
  screenData: state => {
    return state.data;
  },
  getElements: state => {
    return state.elements;
  },
};
const mutations = {
  setData(state, value) {
    Object.assign(state.data, { ...value });
  },
  setElements(state, value) {
    state.elements.push(value);
  },
  setPanelId(state, value) {
    console.log("value", value);
    state.panelId = value;
  },
};
const actions = {
  saveData({ commit, state }) {
    const list = JSON.parse(window.sessionStorage.getItem("panelListStr") || "[]");
    const target = list.find(e => e.id === state.data.id);
    Object.assign(target, { ...state.data });
    console.log("list", list);
    window.sessionStorage.setItem("panelListStr", JSON.stringify(list));
  },
  addElements({ commit, state }, value) {
    commit("setElements", value);
    window.sessionStorage.setItem(state.panelId, JSON.stringify(state.elements));
  },
};
const panel = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
export default panel;
