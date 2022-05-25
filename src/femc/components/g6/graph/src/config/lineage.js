import G6 from '@antv/g6';
export default {
  defaultEdge: {
    type: 'polyline',
    style: {
      radius: 20,
      offset: 35,
      endArrow: {
        path: G6.Arrow.triangle(5, 10, 0), // 使用内置箭头路径函数，参数为箭头的 宽度、长度、偏移量（默认为 0，与 d 对应）
        d: 0,
        fill: '#30B9F3',
      },
      lineWidth: 1,
      lineAppendWidth: 5,
      stroke: '#30B9F3',
    },
  },
  edgeStateStyles: {
    editMode: {
      endArrow: {
        path: G6.Arrow.triangle(5, 10, 7),
        d: 0,
        fill: '#30B9F3',
      },
    },
  },
  defaultNode: {
    type: 'rect-lineage',
    style: {
      fill: '#1B223D',
      lineWidth: 1,
    },
  },
  nodeStateStyles: {
    'current:edit': {
      fill: '#30B9F3',
      'link-point-source': {
        stroke: '#85dcb3',
        opacity: 1,
      },
      'collapse-shape-source': {
        text: '+',
        fill: '#85dcb3',
        opacity: 1,
      },
      'link-point-target': {
        stroke: '#85dcb3',
        opacity: 1,
      },
      'collapse-shape-target': {
        text: '+',
        fill: '#85dcb3',
        opacity: 1,
      },
    },
    'current:readonly': {
      fill: '#30B9F3',
    },
    'current:default': {
      fill: '#30B9F3',
    },
    hover: {
      'link-point-source': {
        opacity: 1,
      },
      'link-point-target': {
        opacity: 1,
      },
      'collapse-shape-source': {
        opacity: 1,
      },
      'collapse-shape-target': {
        opacity: 1,
      },
    },
    'collapsed:source,none': {
      'link-point-source': {
        stroke: '#f98c8c',
      },
      'collapse-shape-source': {
        text: '+',
        fill: '#f98c8c',
      },
      'link-point-target': {
        stroke: '#85dcb3',
      },
      'collapse-shape-target': {
        text: '-',
        fill: '#85dcb3',
      },
    },
    'collapsed:none,target': {
      'link-point-source': {
        stroke: '#85dcb3',
      },
      'collapse-shape-source': {
        text: '-',
        fill: '#85dcb3',
      },
      'link-point-target': {
        stroke: '#f98c8c',
      },
      'collapse-shape-target': {
        text: '+',
        fill: '#f98c8c',
      },
    },
    'collapsed:source,target': {
      'link-point-source': {
        stroke: '#f98c8c',
      },
      'collapse-shape-source': {
        text: '+',
        fill: '#f98c8c',
      },
      'link-point-target': {
        stroke: '#f98c8c',
      },
      'collapse-shape-target': {
        text: '+',
        fill: '#f98c8c',
      },
    },
    'collapsed:none,none': {
      'link-point-source': {
        stroke: '#85dcb3',
      },
      'collapse-shape-source': {
        text: '-',
        fill: '#85dcb3',
      },
      'link-point-target': {
        stroke: '#85dcb3',
      },
      'collapse-shape-target': {
        text: '-',
        fill: '#85dcb3',
      },
    },
    'exist:source,none': {
      'link-point-source': {
        stroke: '#f98c8c',
        opacity: 1,
      },
      'collapse-shape-source': {
        text: 'x',
        fill: '#f98c8c',
        opacity: 1,
      },
      'link-point-target': {
        opacity: 0,
      },
      'collapse-shape-target': {
        opacity: 0,
      },
    },
    'exist:none,target': {
      'link-point-source': {
        opacity: 0,
      },
      'collapse-shape-source': {
        opacity: 0,
      },
      'link-point-target': {
        stroke: '#f98c8c',
        opacity: 1,
      },
      'collapse-shape-target': {
        text: 'x',
        fill: '#f98c8c',
        opacity: 1,
      },
    },
    'exist:source,target': {
      'link-point-source': {
        stroke: '#f98c8c',
        opacity: 1,
      },
      'collapse-shape-source': {
        text: 'x',
        fill: '#f98c8c',
        opacity: 1,
      },
      'link-point-target': {
        stroke: '#f98c8c',
        opacity: 1,
      },
      'collapse-shape-target': {
        text: 'x',
        fill: '#f98c8c',
        opacity: 1,
      },
    },
  },
  layout: {
    type: 'dagre',
    ranksep: 40,
    // controlPoints: true,
  },
  modes: {
    // 支持的 behavior
    default: ['drag-canvas', 'zoom-canvas', 'collapse-lineage', 'drag-node'],
    readonly: ['drag-canvas', 'zoom-canvas', 'drag-node'],
    edit: ['drag-canvas', 'zoom-canvas', 'edit-lineage', 'drag-node'],
  },
};
