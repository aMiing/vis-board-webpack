import G6 from '@antv/g6';
export default {
  modes: {
    default: ['drag-canvas', 'zoom-canvas', 'drag-node', 'force-select'],
    brush: [
      {
        type: 'brush-select',
        trigger: 'drag',
      },
    ],
  },
  layout: {
    type: 'gForce',
    preventOverlap: true,
    gpuEnabled: true,
    workEnabled: true,
  },
  defaultNode: {
    size: 30, // 节点大小
    type: 'circle',
    // 节点样式配置
    style: {
      lineWidth: 2, // 节点描边粗细
      stroke: '#fff',
      shadowBlur: 4,
      shadowColor: '#6bf',
      cursor: 'pointer',
    },
    // 节点上的标签文本配置
    label: '',
    labelCfg: {
      position: 'top',
      offset: 5,
      style: {
        fill: '#f00',
        opacity: 0.7,
        fontSize: 16,
      },
    },
  },
  nodeStateStyles: {
    selected: {
      shadowBlur: 10,
      shadowColor: '#8bf',
      stroke: '#6bf',
      lineWidth: 4,
      fill: '#fff',
    },
    dark: {
      opacity: 0.2,
    },
    highlight: {
      opacity: 1,
      stroke: '#6bf',
      lineWidth: 2,
    },
    active: {
      lineWidth: 8,
      lineDash: [4, 3],
      shadowBlur: 0,
      opacity: 1,
    },
  },
  // 边在默认状态下的样式配置（style）和其他配置
  defaultEdge: {
    type: 'quadratic',
    labelCfg: {
      autoRotate: true,
    },
    // 边样式配置
    style: {
      opacity: 0.7, // 边透明度
      stroke: '#6bf', // 边描边颜色:
      lineWidth: 1,
      lineAppendWidth: 3,
      endArrow: {
        path: 'M 0,0 L 6,-3↵L 3.2,0 L 6,3 Z',
        d: 0,
        fill: '#6bf',
      },
    },
    // 边上的标签文本配置
    // label: null,
  },

  edgeStateStyles: {
    selected: {
      lineWidth: 3,
      shadowBlur: 6,
      endArrow: {
        path: 'M 0,0 L 6,-3 L 6,3 Z↵ M 10, -3↵ L 12 -3↵ L 12 3↵ L 10 3↵ Z',
        d: 0,
        fill: '#6bf',
      },
    },
    highlight: {
      lineWidth: 2,
      opacity: 1,
    },

    dark: {
      opacity: 0.2,
    },
  },
  animate: false, // Boolean，切换布局时是否使用动画过度，默认为 false
  enabledStack: true,
  minZoom: 0.01,
  maxZoom: 10,
};
