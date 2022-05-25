export default {
  defaultEdge: {
    type: 'cubicCustom',
  },
  defaultNode: {
    type: 'modelRectCustom',
  },
  nodeStateStyles: {
    hover: {
      'link-point-top': {
        opacity: 1,
      },
      'link-point-right': {
        opacity: 1,
      },
      'link-point-bottom': {
        opacity: 1,
      },
      'link-point-left': {
        opacity: 1,
      },
    },
    selected: {
      strokeOpacity: 1,
    },
  },
  edgeStateStyles: {
    hover: {
      stroke: '#CAD8F9',
      lineWidth: 2,
      opacity: 1,
    },
    selected: {
      stroke: '#CAD8F9',
      lineWidth: 2,
      opacity: 1,
    },
  },
  modes: {
    // 支持的 behavior
    default: [
      'drag-canvas',
      'zoom-canvas',
      'hover-node',
      'click-select',
      'hover-edge',
      'keyboard',
      'add-menu',
      {
        type: 'tooltipCustom',
        formatText(model) {
          return model.failInfo || model.errMsgs;
        },
        shouldUpdate: evt => {
          const inIcon = evt.target.cfg.name === 'rect-state-icon';
          const failed = evt.item.getModel().state === 'FAILED';
          return inIcon && failed;
        },
        offsetY: -25,
        offsetX: 35,
      },
      {
        type: 'drag-node',
        enableDelegate: true,
        delegateStyle: { fillOpacity: 0.3, fill: '#3D4769', stroke: '#fff' },
      },
    ],
    addEdge: ['add-edge'],
    disabled: [
      'drag-canvas',
      'zoom-canvas',
      'click-select',
      'hover-edge',
      'add-menu',
      {
        type: 'drag-node',
        enableDelegate: true,
        delegateStyle: { fillOpacity: 0.3, fill: '#3D4769', stroke: '#fff' },
      },
    ],
  },
};
