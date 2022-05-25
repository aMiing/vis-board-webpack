const state = {
    config: {},
  };
  const getters = {
    getConfig: state => {
      return state.config;
    },
  };
  const mutations = {
    setConfig(state, value) {
      state.config = value;
    },
  };
  const actions = {};
  const common = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
  };
  export default common;
  