const state = {
  elements: [],
  panelId: "",
};
const getters = {
  getElements: state => {
    return state.elements;
  },
};
const mutations = {
  setElements(state, value) {
    state.elements.push(value);
  },
  setPanelId(state, value) {
    console.log("value", value);
    state.panelId = value;
  },
};
const actions = {
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
