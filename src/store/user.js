const state = {
  userInfo: {
    userCode: "wangcm1",
    userName: "阿明先森",
    userId: "001",
  },
};
const getters = {
  getUserInfo: state => {
    return state.userInfo;
  },
};
const mutations = {
  setUserInfo(state, value) {
    state.userInfo = value;
  },
};

const user = {
  namespaced: true,
  state,
  getters,
  mutations,
};
export default user;
