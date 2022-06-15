import { updateIsFromHistory } from "@/utils/compare";
const state = {
  historyQueue: [{ type: "screen", id: "testId", diff: [] }],
  maxHistoryLength: 10,
  currentHistoryId: "",
  savedTagId: "", //标记保存状态
  currentIndex: 0,
  isUndo: false, // 是否是在执行redo
};

const getters = {
  noHistory(state) {
    return !state.historyQueue.length;
  },
  // 实际到第一项， 第一项的记录应可以被回退；所以currentHistoryId应该回到空状态
  isFirstHistory(state) {
    return (
      getters.noHistory(state) ||
      /**state.historyQueue.at(0).id === **/ state.currentHistoryId === ""
    );
  },
  isLastHistory(state) {
    return !state.historyQueue.length || state.historyQueue.length - 1 === state.currentIndex;
  },
  noNeedBeSave(state) {
    return state.savedTagId === state.currentHistoryId;
  },
  historyLength(state) {
    return state.historyQueue.length;
  },
  currentHistoryIndex(state) {
    return state.currentIndex;
  },
};

const mutations = {
  pushHistory(state, value) {
    state.historyQueue.push(value);
  },
  updateCurrentHistoryId(state, value) {
    state.currentHistoryId = value;
  },
  updateCurrentHistoryIndex(state, value) {
    state.currentIndex = value;
  },
  coverOldHistory(state) {
    // const index = state.historyQueue.findIndex(e => e.id === state.currentHistoryId);
    const index = state.currentIndex;
    console.log("coverOldHistory", index);
    state.historyQueue.splice(index + 1, state.maxHistoryLength);
  },
  isUndoOperator(state, value) {
    state.isUndo = value;
  },
};

const actions = {
  addHistory({ state, commit }, value) {
    const currentHistory = state.historyQueue[state.currentIndex];
    const fromHistory = updateIsFromHistory(currentHistory, value, state);
    console.log("fromHistory", fromHistory);
    // 更新isUndo
    commit("isUndoOperator", false);
    if (fromHistory) return;
    // 如果当前下标不在数组的最后，则覆盖其后
    if (!getters.isLastHistory(state)) {
      commit("coverOldHistory");
    }
    const history = value;
    commit("pushHistory", history);
    let newIndex = state.currentIndex + 1;
    // 超出长度
    if (state.historyQueue.length > state.maxHistoryLength) {
      state.historyQueue.shift();
      newIndex--;
    }
    commit("updateCurrentHistoryIndex", newIndex);
  },
  async undo({ commit, dispatch, state }) {
    commit("isUndoOperator", true);
    console.log("!undo");
    // const index = state.historyQueue.findIndex(e => e.id === state.currentHistoryId);
    if (~state.currentIndex) {
      // 向后一步
      const history = state.historyQueue[state.currentIndex];
      console.log("state.currentIndex", state.currentIndex);
      // await commit("updateCurrentHistoryId", state.historyQueue[index - 1]?.id || "");
      commit("updateCurrentHistoryIndex", state.currentIndex - 1);
      // 更新数据
      dispatch("panel/updateFromDiff", { history, next: false }, { root: true });
    }
  },
  async redo({ commit, dispatch, state }) {
    commit("isUndoOperator", false);
    console.log("!redo");
    // if (state.currentHistoryId) {
    // const index = state.historyQueue.findIndex(e => e.id === state.currentHistoryId);

    // if (~index) {
    // const index = ~state.currentIndex ? state.currentIndex : 0;
    // 向前一步
    const history = state.historyQueue[state.currentIndex + 1];
    // 更新数据
    commit("updateCurrentHistoryIndex", state.currentIndex + 1);
    await dispatch("panel/updateFromDiff", { history, next: true }, { root: true });
    // commit("updateCurrentHistoryId", state.historyQueue[index + 1]?.id || "");
    // }
    // } else {
    // }
  },
};

const history = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
export default history;
