var DEFAULT_TRIGGER = 'shift';
const ALL_TYPE = ['node', 'edge', 'combo'];
const isObject = function (item) {
  return Object.prototype.toString.call(item) === '[object Object]';
};
const _option = {
  getDefaultCfg() {
    return {
      multiple: true,
      trigger: DEFAULT_TRIGGER,
      selectedState: 'selected',
    };
  },
  getEvents() {
    return {
      'node:click': 'onClick',
      'edge:click': 'onClick',
      'combo:click': 'onClick',
      'canvas:click': 'onCanvasClick',
      keyup: 'onKeyUp',
      keydown: 'onKeyDown',
    };
  },
  onClick: function onClick(evt) {
    var self = this;
    var item = evt.item;

    if (!item || item.destroyed) {
      return;
    }

    var c_type = item.getType();
    var graph = self.graph,
      keydown = self.keydown,
      multiple = self.multiple,
      shouldUpdate = self.shouldUpdate,
      shouldBegin = self.shouldBegin;

    if (!shouldBegin.call(self, evt)) {
      return;
    }
    // 先按下shift键，选择第一个对象时，其实应该是单选状态
    const hasSelectedTarget = this.checkSelectedTarget(ALL_TYPE);

    // 非多选状态
    if (!keydown || !hasSelectedTarget || !multiple) {
      this.darkOther(item, ALL_TYPE);
    }

    if (item.hasState(self.selectedState)) {
      if (shouldUpdate.call(self, evt)) {
        graph.clearItemStates(item);
        this.refreshSelectedStyle(c_type, item, ALL_TYPE, false);
      }
    } else {
      if (shouldUpdate.call(self, evt)) {
        graph.clearItemStates(item);
        graph.setItemState(item, self.selectedState, true);
        // 更新选中样式
        this.refreshSelectedStyle(c_type, item, ALL_TYPE, true);
      }
    }
  },
  onCanvasClick: function onCanvasClick() {
    this.canvasClick(ALL_TYPE);
  },
  onKeyDown: function onKeyDown(e) {
    var self = this;
    var code = e.key;

    if (!code) {
      return;
    }

    if (code.toLowerCase() === this.trigger.toLowerCase() || code.toLowerCase() === 'control') {
      self.keydown = true;
    } else {
      self.keydown = false;
    }
  },
  onKeyUp: function onKeyUp() {
    var self = this;
    self.keydown = false;
  },

  canvasClick(ALL_TYPE) {
    var graph = this.graph;
    const selectedNode = graph.findAllByState('node', 'selected').length;
    const selectedEdge = graph.findAllByState('edge', 'selected').length;
    const darkEdge = graph.findAllByState('edge', 'dark').length;
    const darkNode = graph.findAllByState('node', 'dark').length;
    const activeNode = graph.findAllByState('node', 'active').length;
    if (selectedNode + selectedEdge + darkEdge + darkNode === 0) return;
    ALL_TYPE.forEach(type => {
      graph.findAll(type, combo => {
        combo.hasState('selected') && this.handleSelect(type, combo, false);
        graph.clearItemStates(combo);
      });
    });
  },
  darkOther(item, ALL_TYPE) {
    !Array.isArray(item) && (item = [item]);
    ALL_TYPE.forEach(type => {
      this.graph.findAll(type, combo => {
        if (!item.includes(combo)) {
          if (combo._cfg.states.length != 1 || combo._cfg.states[0] != 'dark') {
            combo.hasState('selected') && this.handleSelect(type, combo, false);
            this.graph.clearItemStates(combo);
            this.graph.setItemState(combo, 'dark', true);
          }
        }
      });
    });
  },

  refreshSelectedStyle(type, item, ALL_TYPE, selectOr) {
    const graph = this.graph;

    graph.setItemState(item, 'dark', !selectOr);

    type == 'node' &&
      (item._cfg.edges.forEach(edge => {
        selectOr ? graph.clearItemStates(edge, 'dark') : graph.setItemState(edge, 'dark', true);
        edge.toFront();
      }),
      graph.getNeighbors(item).forEach(node => {
        if (!node.hasState('selected')) {
          graph.setItemState(node, 'highlight', selectOr);
          graph.setItemState(node, 'dark', !selectOr);
        }
      }));
    type == 'edge' &&
      (graph.setItemState(item.getTarget(), 'dark', !selectOr),
      graph.setItemState(item.getSource(), 'dark', !selectOr),
      !item.getSource().hasState('selected') &&
        graph.setItemState(item.getSource(), 'highlight', selectOr),
      !item.getTarget().hasState('selected') &&
        graph.setItemState(item.getTarget(), 'highlight', selectOr));
    selectOr && graph.priorityState(item, 'selected');
    this.handleSelect(type, item, selectOr);
  },

  checkSelectedTarget(ALL_TYPE) {
    let hasSelectedTarget = false;
    ALL_TYPE.forEach(type => {
      const length = this.graph.findAllByState(type, 'selected').length;
      length > 0 && (hasSelectedTarget = true);
    });
    return hasSelectedTarget;
  },

  resetFilter(id, relayout) {
    if (id) {
      delete this.filters[id];
    } else {
      this.filters = {};
    }
    this.renderFilter(relayout);
  },
  filterByFunction(func, id, relayout) {
    /* eslint-disable-next-line no-undef */
    const _randomId = id || createId('func');
    this.filters[_randomId] = func;
    this.renderFilter(relayout);
    return _randomId;
  },
  renderFilter(relayout) {
    if (!this.graph) return;
    // this.graph.startBatch()
    const _allElements = this.getAllElements();
    let _filterElements = _allElements;
    Object.keys(this.filters).forEach(key => {
      _filterElements = this.filters[key](_filterElements);
    });
    const _filterNodes = _filterElements.nodes;
    const _filterEdges = _filterElements.edges.filter(ele => {
      return _filterNodes.includes(ele._cfg.target) && _filterNodes.includes(ele._cfg.source);
    });
    this.$removeNodes = _allElements.nodes.difference(_filterNodes);
    this.$removeEdges = _allElements.edges.difference(_filterEdges);
    return _filterElements;
  },

  getAllElements() {
    return this.graph && { nodes: this.graph.getNodes(), edges: this.graph.getEdges() };
  },
  noSelectedToDark(select) {
    const allEle = this.getAllElements();
    Object.keys(allEle).forEach(type => {
      allEle[type].forEach(item => {
        if (!select[type].includes(item)) {
          this.graph.clearItemStates(item);
          item.setState('dark', true);
          this.handleSelect(type.slice(0, 4), item, false);
        }
      });
    });
  },

  // 处理选中的样式
  handleSelect(type, item, selectOr) {
    if (type == 'edge') return;
    const img = selectOr ? 'h_img' : 'd_img';
    !isObject(item) && (item = this.graph.findById(item));
    const model = {
      icon: {
        img: item.getModel()[img],
      },
    };
    this.graph.updateItem(item, model);
  },
};
export default _option;
