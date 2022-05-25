import GGraphLineage from './lineage.vue';
import GGraphForce from './force.vue';

const install = function (Vue) {
  Vue.component(GGraphLineage.name, GGraphLineage);
  Vue.component(GGraphForce.name, GGraphForce);
};

GGraphLineage.install = Vue => {
  Vue.component(GGraphLineage.name, GGraphLineage);
};

GGraphForce.install = Vue => {
  Vue.component(GGraphForce.name, GGraphForce);
};

export default {
  install,
};

export { GGraphLineage, GGraphForce };
