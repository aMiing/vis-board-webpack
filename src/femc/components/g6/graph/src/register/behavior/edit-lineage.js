const _option = {
  getEvents() {
    return {
      'node:click': 'onMouseclick',
      afteradditem: 'afteradditem',
      beforemodechange: 'clearItemState',
      aftermodechange: 'resetItemState',
    };
  },
  clearItemState() {
    this.graph.getNodes().forEach(node => {
      node.clearStates(node.getStates());
    });
  },
  resetItemState() {
    this.graph.getNodes().forEach(node => {
      this.afteradditem({ item: node });
    });
  },
  afteradditem(e) {
    const { item } = e;
    const type = item.getType();
    if (item.hasState('current:edit')) {
      // 当状态为current的时候说明它是当前节点
      return;
    }
    if (type === 'node') {
      const state =
        (item.getInEdges().length ? 'source' : 'none') +
        ',' +
        (item.getOutEdges().length ? 'target' : 'none');
      this.graph.setItemState(item, 'exist', state);
    } else {
      // 当添加节点为边的时候
      this.afteradditem({ item: item.getSource() });
      this.afteradditem({ item: item.getTarget() });
    }
  },
  onMouseclick(e) {
    if (this.shouldUpdate.call(this, e)) {
      const item = e.item;
      const direction = ~e.target.cfg.name.indexOf('target') ? 'target' : 'source';
      const position = Number(direction === 'target');
      const statename = `exist`;
      const isCurrent = item.hasState('current:edit');
      let extend = true;
      if (!isCurrent) {
        let state = item
          .getStates()
          .find(state => ~state.indexOf(statename))
          .replace(`${statename}:`, '')
          .split(',');
        extend = state[position] !== direction;
      }
      // 点击的位置是锚点
      if (e.target.cfg.isCollapseShape) {
        const direction = ~e.target.cfg.name.indexOf('target') ? 'target' : 'source';
        this.graph.emit('extendlineage', {
          item,
          direction,
          extend,
        });
      }
    }
  },
};
export default _option;
