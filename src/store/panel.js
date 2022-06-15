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

  pushElements(state, value) {
    state.elements.push(...value);
  },
  insertElement(state, { index, element }) {
    state.elements.splice(index, 0, ...element);
  },
  popElement(state, index = -1) {
    console.log("~index", ~index);
    ~index ? state.elements.splice(index, 1) : state.elements.pop();
  },
  updateScreenProp(state, value) {
    const { key, val } = value;
    state.screen[key] = val;
  },
  updateElementProp(state, { index, key, val }) {
    state.elements[index][key] = val;
  },
};
const actions = {
  // 任何属性和数据的变更都通过此方法提交，不再通过监听的方式获取变化
  postPropsChange({ commit, dispatch, state }, value) {
    console.log("postPropsChange ---- value", value);
  },
  recordDataChange({ dispatch }, value) {
    const { oldV, newV, type } = value;
    const _diff = diff(oldV, newV);
    _diff && dispatch("history/addHistory", { type, id: UUID(), diff: _diff }, { root: true });
  },
  // 模拟向后台提交
  saveData({ commit, state }) {
    window.sessionStorage.setItem("elements_" + state.screenId, JSON.stringify(state.elements));
    window.sessionStorage.setItem("screen_" + state.screenId, JSON.stringify(state.screen));
    // 更新saveTag
    commit("history/updateSaveTagId", null, { root: true });
  },
  addElements({ commit, state }, value) {
    commit("pushElements", [value]);
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
    if (type === "screen") {
      Object.keys(diff).forEach(async key => {
        await commit("updateScreenProp", { key, val: diff[key][target] });
      });
    } else if (type === "elements") {
      for (let index = 0; index < diff.length; index++) {
        // diffType: 删除 (-)、新增 (+)、更改的子对象 (~) 或未更改的 (' ')
        const [diffType, data] = diff[index];
        if (diffType === "~") {
          Object.keys(data).forEach(async key => {
            await commit("updateElementProp", { index, key, val: data[key][target] });
          });
        } else if (diffType === "+") {
          next ? commit("pushElements", [data]) : commit("popElement");
        } else if (diffType === "-") {
          next ? commit("popElement", index) : commit("insertElement", { index, element: [data] });
        }
      }
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
