import G6 from '@antv/g6';
import rectLineage from './node/rect-lineage';
import rhombusLineage from './node/rhombus-lineage';
import collapseLineage from './behavior/collapse-lineage';
import editLineage from './behavior/edit-lineage';
G6.registerNode('rect-lineage', rectLineage, 'single-node');
G6.registerNode('rhombus-lineage', rhombusLineage, 'single-node');
G6.registerBehavior('collapse-lineage', collapseLineage);
G6.registerBehavior('edit-lineage', editLineage);
