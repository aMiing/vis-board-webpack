import { diff } from "json-diff";
export const updateIsFromHistory = (curHistory, newHistory, state) => {
  // 后退操作一定不需要加入历史队列(判断时候是最新的一条是因为可能isUndo更新不及时)
  if (state.isUndo && state.currentIndex < state.historyQueue.length - 1) return true;
  if (curHistory?.type !== newHistory?.type) return false;
  // 前进操作，如果diff数据一样，则不新增记录，diff数据不一样，则删除后面的数据并新增
  return diff(curHistory?.diff, newHistory?.diff) === undefined;
};
