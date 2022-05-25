import { deepMix } from '@antv/util';
import common from './common';
import _flow from './flow';
import _lineage from './lineage';
import _force from './force';
const flow = deepMix({}, common, _flow);
const lineage = deepMix({}, common, _lineage);
const force = deepMix({}, common, _force);
export default {
  flow,
  lineage,
  common,
  force,
};
export { flow, lineage, common, force };
