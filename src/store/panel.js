const state = {
    elements: []
  };
  const getters = {
    getElements: state => {
      return state.elements;
    },
  };
  const mutations = {
    addElements(state, value) {
      state.elements.push(value);
    },
  };
  const actions = {
      addElements({ commit }, value) {
        commit('addElements', value)
      }
  };
  const panel = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
  };
  export default panel;
  