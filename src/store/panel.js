import { diff } from "json-diff";
import UUID from "@/utils/uid.js";
import screenConfig from "@/config/screen.js";
const defaultScreen = Object.keys(screenConfig).reduce((total, e) => {
  return Object.assign(total, { ...screenConfig[e]?.props });
}, {});

const state = {
  elements: [],
  screen: defaultScreen,
  screenId: "",
  screenChanged: false,
  elementsChanged: false,
};
const getters = {
  screenData: state => {
    // 数据解耦
    return state.screen;
  },
  getElements: state => {
    return state.elements;
  },
  changed: state => {
    return state.screenChanged || state.elementsChanged;
  },
  getSnapshotQueue: state => {
    return state.snapshotQueue;
  },
};
const mutations = {
  updateId(state, value) {
    state.screenId = value;
  },
  useElements(state, value) {
    state.elements = value;
  },
  useScreen(state, value) {
    Object.assign(state.screen, { ...value });
  },

  setElements(state, value) {
    state.elements.push(...value);
  },
  updateScreenProp(state, value) {
    const { key, val } = value;
    state.screen[key] = val;
  },
};
const actions = {
  // 任何属性和数据的变更都通过此方法提交，不再通过监听的方式获取变化
  postPropsChange({ commit, dispatch, state }, value) {
    console.log("postPropsChange ---- value", value);
  },

  recordElementsChange({ commit, dispatch, state }, value) {
    const { oldV, newV } = value;
    // 更新screen
    const diff = diff(oldV, newV);
    dispatch("history/addHistory", { type: "elements", id: UUID(), diff }, { root: true });
  },
  recordScreenChange({ commit, dispatch, state }, value) {
    const { oldV, newV } = value;
    dispatch(
      "history/addHistory",
      { type: "screen", id: UUID(), diff: diff(oldV, newV) },
      { root: true }
    );
  },
  // 模拟向后台提交
  saveData({ commit, state }) {
    window.sessionStorage.setItem("elements_" + state.screenId, JSON.stringify(state.elements));
    window.sessionStorage.setItem("screen_" + state.screenId, JSON.stringify(state.screen));
  },
  addElements({ commit, state }, value) {
    commit("setElements", [value]);
  },
  fetchElements({ commit, state }) {
    const elementsStr = window.sessionStorage.getItem("elements_" + state.screenId);
    const elements = JSON.parse(elementsStr || "[]");
    commit("useElements", elements);
  },
  fetchScreenData({ commit, state }) {
    const screenStr = window.sessionStorage.getItem("screen_" + state.screenId);
    const screen = JSON.parse(screenStr || "{}");
    commit("useScreen", screen);
  },
  updateFromDiff({ commit, state }, value) {
    // next = false, 后退
    const {
      history: { diff, type = "screen" },
      next = false,
    } = value;
    const target = next ? "__new" : "__old";
    console.log("target, diff", target, diff);
    if (type === "screen") {
      console.log("diff----", diff);
      Object.keys(diff).forEach(async key => {
        await commit("updateScreenProp", { key, val: diff[key][target] });
      });
    }
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
