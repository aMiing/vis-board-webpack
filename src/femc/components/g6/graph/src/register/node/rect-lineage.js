'use strict';
import { mix } from '@antv/util';
import G6 from '@antv/g6';
var _tslib = require('tslib');
const _option = {
  // 自定义节点时的配置
  options: {
    size: [112, 56],
    style: {
      radius: 2,
      // stroke: G6.Global.defaultShapeStrokeColor,
      fill: G6.Global.defaultShapeFillColor,
      lineWidth: G6.Global.defaultNode.style.lineWidth,
      fillOpacity: 1,
      stroke: '#30B9F3',
    },
    // 文本样式配置
    labelCfg: {
      style: {
        fill: 'pink',
        fontSize: 14,
        textBaseline: 'middle',
        textAlign: 'center',
      },
      padding: 10,
    },
    // 节点上左右上下四个方向上的链接circle配置
    linkPoints: {
      source: [0.5, 0],
      target: [0.5, 1],
      // circle的大小
      size: 14,
      lineWidth: 1,
      fill: '#252F4D',
      // fillOpacity: 0,
      // stroke: '#72CC4A',
      opacity: 0,
      cursor: 'pointer',
    },

    // 连接点，默认为左右
    // anchorPoints: [{ x: 0, y: 0.5 }, { x: 1, y: 0.5 }]
    anchorPoints: [
      [0.5, 0],
      [0.5, 1],
    ],
  },
  shapeType: 'rect-custom',
  labelPosition: 'center',
  getLabelStyle(labelStyle, row = 1, width, pertext = '') {
    if (width) {
      const fontSize = labelStyle.fontSize || 12;
      const ellipsis = '...';
      const ellipsisLength = G6.Util.getTextSize(ellipsis, fontSize)[0];
      if (width < ellipsisLength) {
        labelStyle.text = ellipsis;
      } else {
        let currentWidth = 0;
        let str = labelStyle.text;
        const pattern = new RegExp('[\u4E00-\u9FA5]+'); // distinguish the Chinese charactors and letters
        let i = 0;
        for (; i < str.length; i++) {
          const letter = str[i];
          if (pattern.test(letter)) {
            currentWidth += fontSize;
          } else {
            // get the width of single letter according to the fontSize
            currentWidth += G6.Util.getLetterWidth(letter, fontSize);
          }
          if (currentWidth > width) {
            for (; i > 0; i--) {
              if (pattern.test(str[i])) {
                currentWidth -= fontSize;
              } else {
                // get the width of single letter according to the fontSize
                currentWidth -= G6.Util.getLetterWidth(str[i], fontSize);
              }
              if (currentWidth < width && row > 1) {
                labelStyle.text = str.substr(i);
                return this.getLabelStyle(
                  labelStyle,
                  --row,
                  width,
                  pertext + `${str.substr(0, i)}\n`
                );
              } else if (currentWidth < width - ellipsisLength) {
                labelStyle.text = `${str.substr(0, i)}${ellipsis}`;
                break;
              }
            }
            break;
          }
        }
        labelStyle.text = pertext + labelStyle.text;
      }
    }
    return labelStyle;
  },
  drawLabel: function drawLabel(cfg, group) {
    const { labelCfg } = this.getOptions(cfg);
    var fontStyle = labelCfg.style;
    var size = this.getSize(cfg);
    var width = size[0] - 2 * (labelCfg.padding || 0);
    var label = group.find(function (element) {
      return element.get('className') === 'node-label';
    });
    let labelStyle = this.getLabelStyle(
      (0, _tslib.__assign)({}, label ? label.attr() : {}, fontStyle, {
        x: 0,
        y: 0,
        text: cfg.label,
      }),
      2,
      width
    );
    if (!label) {
      label = group.addShape('text', {
        attrs: labelStyle,
        className: 'node-label',
        name: 'node-label',
        draggable: true,
      });
    } else {
      label.attr(labelStyle);
    }
    return label;
  },
  drawShape: function drawShape(cfg, group) {
    var style = this.getShapeStyle(cfg);
    var keyShape = group.addShape('rect', {
      attrs: style,
      className: this.type + '-keyShape',
      name: this.type + '-keyShape',
      draggable: true,
    });
    this.drawLinkPoints(cfg, group);
    return keyShape;
  },

  /**
   * 绘制节点上的LinkPoints
   * @param {Object} cfg data数据配置项
   * @param {Group} group Group实例
   */
  drawLinkPoints: function drawLinkPoints(cfg, group) {
    const { linkPoints } = this.getOptions(cfg);
    var markSize = linkPoints.size,
      markR = linkPoints.r,
      markStyle = (0, _tslib.__rest)(linkPoints, ['source', 'target', 'size', 'r']);
    var size = this.getSize(cfg);
    var width = size[0];
    var height = size[1];
    for (let i = 0; i < 2; i++) {
      const name = ['source', 'target'][i];
      if (linkPoints[name]) {
        const [x, y] = linkPoints[name];
        const position = {
          x: width * (x - 0.5),
          y: height * (y - 0.5) + 14 * (y - 0.5),
        };
        let linkPoint = group.find(function (element) {
          return element.get('className') === `link-point-${name}`;
        });
        let collapseText = group.find(function (element) {
          return element.get('className') === `collapse-shape-${name}`;
        });
        markStyle = (0, _tslib.__assign)(
          {},
          markStyle,
          {
            r: markSize / 2 || markR || 5,
          },
          position
        );
        if (cfg[`no${name}`]) {
          if (linkPoint) {
            group.removeChild(linkPoint);
            group.removeChild(collapseText);
          }
          continue;
        }
        if (!linkPoint) {
          group.addShape('circle', {
            attrs: markStyle,
            className: `link-point-${name}`,
            name: `link-point-${name}`,
            isAnchorPoint: true,
          });
          group.addShape('text', {
            attrs: (0, _tslib.__assign)({}, markStyle, {
              x: position.x,
              y: position.y - 1,
              width: 12,
              height: 12,
              textAlign: 'center',
              textBaseline: 'middle',
              text: '-',
              fontSize: 12,
              fill: '#fff',
            }),
            className: `collapse-shape-${name}`,
            name: `collapse-shape-${name}`,
            isCollapseShape: true,
          });
        } else {
          linkPoint.attr(markStyle);
          collapseText.attr(
            (0, _tslib.__assign)({}, markStyle, {
              x: position.x,
              y: position.y - 1,
              width: 12,
              height: 12,
              textAlign: 'center',
              textBaseline: 'middle',
              fontSize: 12,
              fill: '#fff',
            })
          );
        }
      }
    }
  },
  /**
   * 获取节点的样式，供基于该节点自定义时使用
   * @param {Object} cfg 节点数据模型
   * @return {Object} 节点的样式
   */
  getShapeStyle: function getShapeStyle(cfg) {
    var defaultStyle = this.getOptions(cfg).style;
    var strokeStyle = {
      stroke: cfg.color,
    }; // 如果设置了color，则覆盖默认的stroke属性

    var style = (0, mix)({}, defaultStyle, strokeStyle);
    var size = this.getSize(cfg);
    var width = style.width || size[0];
    var height = style.height || size[1];
    var styles = Object.assign(
      {},
      {
        x: -width / 2,
        y: -height / 2,
        width: width,
        height: height,
      },
      style
    );
    return styles;
  },
  update: function update(cfg, item) {
    var group = item.getContainer(); // 这里不传 cfg 参数是因为 cfg.style 需要最后覆盖样式

    var defaultStyle = this.getOptions({}).style;
    var size = this.getSize(cfg);
    var keyShape = item.get('keyShape');

    if (!cfg.size) {
      size[0] = keyShape.attr('width') || defaultStyle.width;
      size[1] = keyShape.attr('height') || defaultStyle.height;
    } // 下面这些属性需要覆盖默认样式与目前样式，但若在 cfg 中有指定则应该被 cfg 的相应配置覆盖。

    var strokeStyle = {
      stroke: cfg.color,
      x: -size[0] / 2,
      y: -size[1] / 2,
      width: size[0],
      height: size[1],
    }; // 与 getShapeStyle 不同在于，update 时需要获取到当前的 style 进行融合。即新传入的配置项中没有涉及的属性，保留当前的配置。

    var style = (0, mix)({}, defaultStyle, keyShape.attr(), strokeStyle);
    style = (0, mix)(style, cfg.style);
    this.updateShape(cfg, item, style, false);
    this.drawLinkPoints(cfg, group);
    this.drawLabel(cfg, group);
  },
};
export default _option;
