var _tslib = require('tslib');
const _option = {
  getDefaultCfg() {
    return {
      itemCaches: {},
    };
  },
  getEvents() {
    return {
      'node:mouseenter': 'onMouseenter',
      'node:mouseleave': 'onMouseleave',
      'node:click': 'onMouseclick',
      beforemodechange: 'beforemodechange',
      aftermodechange: 'aftermodechange',
    };
  },
  beforemodechange() {
    this.initCollapse();
    this.graph.getNodes().forEach(node => {
      node.clearStates(node.getStates());
    });
  },
  aftermodechange() {
    this.graph.getNodes().forEach(item => {
      const edges = item.getEdges().filter(item => item.isVisible());
      const nodeModle = item.getModel();
      let newTargetCollapsed = !edges.find(edge => edge.getModel().source === item.getModel().id);
      let newSourceCollapsed = !edges.find(edge => edge.getModel().target === item.getModel().id);
      if (nodeModle.nodeType === 2) {
        let _model = {};
        if (newSourceCollapsed) {
          _model[`nosource`] = true;
        }
        if (newTargetCollapsed) {
          _model[`notarget`] = true;
        }
        item.update(_model);
      }
      const state =
        (newSourceCollapsed ? 'source' : 'none') + ',' + (newTargetCollapsed ? 'target' : 'none');
      this.graph.setItemState(item, 'collapsed', state);
    });
  },
  /****
   * 重置this.itemCaches
   */
  initCollapse() {
    for (const directiveKey in this.itemCaches) {
      const directionItem = this.itemCaches[directiveKey];
      for (const typeKey in directionItem) {
        const typeItems = directionItem[typeKey];
        ['nodes', 'edges'].forEach(type => {
          const items = typeItems[type];
          items.forEach(({ id }) => {
            this.graph.showItem(id);
          });
        });
      }
    }
  },
  onMouseenter(e) {
    const { item } = e;
    const edges = item.getEdges().filter(item => item.isVisible());
    if (this.shouldUpdate.call(this, e)) {
      const nodeModle = item.getModel();
      let newTargetCollapsed = !edges.find(edge => edge.getModel().source === item.getModel().id);
      let newSourceCollapsed = !edges.find(edge => edge.getModel().target === item.getModel().id);
      this.graph.setItemState(item, 'hover', true);
      if (nodeModle.nodeType === 2) {
        let _model = {};
        if (newSourceCollapsed) {
          _model[`nosource`] = true;
        }
        if (newTargetCollapsed) {
          _model[`notarget`] = true;
        }
        item.update(_model);
      }
      const state =
        (newSourceCollapsed ? 'source' : 'none') + ',' + (newTargetCollapsed ? 'target' : 'none');
      this.graph.setItemState(item, 'collapsed', state);
    }
  },
  onMouseleave(e) {
    const item = e.item;
    if (this.shouldUpdate.call(this, e)) {
      item.clearStates('hover');
    }
  },
  getCollaspeItems(nodes, type, total, root) {
    total = total || { edges: [], nodes: [] };
    if (Array.isArray(nodes)) {
      const nodesNeighbors = nodes.reduce((items, current) => {
        const _neighbors = current
          .getNeighbors(type)
          .filter(item => !items.find(_item => item.getModel().id === _item.getModel().id));
        return items.concat(_neighbors);
      }, []);
      const neighborNodes = nodesNeighbors.filter(
        item => !total.nodes.concat([root.getModel()]).find(({ id }) => item.getModel().id === id)
      );
      const nodesNeighborEdges = nodes.reduce((items, current) => {
        const _neighbors = current
          .getEdges()
          .filter(item => !items.find(({ id }) => item.getModel().id === id));
        return items.concat(_neighbors);
      }, []);
      const neignborEdges = nodesNeighborEdges.filter(
        item => !total.edges.find(({ id }) => item.getModel().id === id)
      );
      total.edges = total.edges.concat(
        neignborEdges.map(item => (0, _tslib.__rest)(item.getModel(), ['style', 'labelCfg']))
      );
      total.nodes = total.nodes.concat(
        neighborNodes.map(item => (0, _tslib.__rest)(item.getModel(), ['style', 'labelCfg']))
      );
      return neighborNodes.length ? this.getCollaspeItems(neighborNodes, type, total, root) : total;
    } else {
      const neighborNodes = nodes
        .getNeighbors(type)
        .filter(item => !total.nodes.find(({ id }) => item.getModel().id === id));
      const neignborEdges = (type === 'target' ? nodes.getOutEdges() : nodes.getInEdges()).filter(
        item => !total.edges.find(({ id }) => item.getModel().id === id)
      );
      total.edges = total.edges.concat(
        neignborEdges.map(item => (0, _tslib.__rest)(item.getModel(), ['style', 'labelCfg']))
      );
      total.nodes = total.nodes.concat(
        neighborNodes.map(item => (0, _tslib.__rest)(item.getModel(), ['style', 'labelCfg']))
      );
      return this.getCollaspeItems(neighborNodes, type, total, nodes);
    }
  },
  onMouseclick(e) {
    if (this.shouldUpdate.call(this, e)) {
      const { item } = e;
      const model = item.getModel();
      const direction = ~e.target.cfg.name.indexOf('target') ? 'target' : 'source';
      const statename = `collapsed`;
      const position = Number(direction === 'target');
      let state = item
        .getStates()
        .find(state => ~state.indexOf(statename))
        .replace('collapsed:', '')
        .split(',');
      if (e.target.cfg.isCollapseShape) {
        if (state[position] !== direction) {
          this.itemCaches[model.id] = this.itemCaches[model.id] || {};
          this.itemCaches[model.id][direction] = this.getCollaspeItems(item, direction);
          this.itemCaches[model.id][direction].nodes.forEach(({ id }) => {
            this.graph.hideItem(id);
          });
          state[position] = direction;
          this.graph.setItemState(item, statename, state.join(','));
          this.graph.emit('itemcollapsed', {
            item,
            direction,
            collapsed: true,
          });
        } else if (this.itemCaches[model.id] && this.itemCaches[model.id][direction]) {
          ['node', 'edge'].forEach(type => {
            this.itemCaches[model.id][direction][`${type}s`].forEach(_model => {
              this.graph.showItem(_model.id);
            });
            this.itemCaches[model.id][direction][`${type}s`] = [];
          });
          state[position] = 'none';
          this.graph.setItemState(item, statename, state.join(','));
          this.graph.emit('itemcollapsed', {
            item,
            direction,
            collapsed: false,
          });
        } else {
          this.graph.emit('extendlineage', {
            item,
            direction,
            extend: true,
          });
        }
      }
    }
  },
};
export default _option;
