import G6 from '@antv/g6';
import config from './config';
import { deepMix } from '@antv/util';
class GGraph extends G6.Graph {
  constructor(opt1, opt2) {
    let _option = {};
    const _opt1Type = Object.prototype.toString.call(opt1);
    const _opt2Type = Object.prototype.toString.call(opt2);
    if (arguments.length >= 2) {
      if (_opt1Type === '[object String]' && _opt2Type === '[object Object]') {
        _option = deepMix({}, config[opt1], opt2);
      } else if (_opt1Type === '[object Object]' && _opt2Type === '[object String]') {
        _option = deepMix({}, opt1, config[opt2]);
      } else {
        console.warn(`Arguments invalid！`);
      }
    } else if (arguments.length === 1) {
      if (_opt1Type === '[object String]') {
        if (!config[opt1]) {
          console.warn('no type in reset');
        } else {
          _option = config[opt1];
        }
      } else if (_opt1Type === '[object Object]') {
        _option = opt1;
      } else {
        console.warn(`${_opt1Type} type not supported!`);
      }
    }
    super(_option);
  }
}
export { GGraph };
