<template>
  <div
    class="g-tree el-tree"
    :class="{
      'el-tree--highlight-current': highlightCurrent,
      'is-dragging': !!dragState.draggingNode,
      'is-drop-not-allow': !dragState.allowDrop,
      'is-drop-inner': dragState.dropType === 'inner',
    }"
    role="tree"
  >
    <div v-if="isEmpty" class="el-tree__empty-block">
      <slot v-if="$slots.empty" name="empty" />
      <span v-else class="el-tree__empty-text">{{ emptyText }}</span>
    </div>
    <recycle-scroller
      v-else-if="virtualScroll"
      class="virtual-tree__wrapper"
      :items="virtualItems"
      :item-size="itemHeight"
    >
      <template #default="{ item }">
        <el-tree-node
          :node="item"
          :props="props"
          :virtual-scroll="virtualScroll"
          :render-after-expand="renderAfterExpand"
          :show-checkbox="showCheckbox"
          :render-content="renderContent"
          @node-expand="handleNodeExpand"
        />
      </template>
    </recycle-scroller>
    <template v-else>
      <el-tree-node
        v-for="child in root.childNodes"
        :key="getNodeKey(child)"
        :node="child"
        :props="props"
        :render-after-expand="renderAfterExpand"
        :show-checkbox="showCheckbox"
        :render-content="renderContent"
        @node-expand="handleNodeExpand"
      ></el-tree-node>
    </template>

    <div
      v-show="dragState.showDropIndicator"
      ref="dropIndicator"
      class="el-tree__drop-indicator"
    ></div>
  </div>
</template>

<script>
import TreeStore from "./model/tree-store";
import { getNodeKey, findNearestComponent } from "./model/util";
import ElTreeNode from "./tree-node.vue";
import { t } from "element-ui/lib/locale";
import emitter from "element-ui/lib/mixins/emitter";
import { addClass, removeClass } from "element-ui/lib/utils/dom";
import { RecycleScroller } from "vue-virtual-scroller";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";

export default {
  name: "GTree",

  components: {
    ElTreeNode,
    RecycleScroller,
  },

  mixins: [emitter],

  props: {
    virtualScroll: {
      type: Boolean,
      default: false,
    },
    itemHeight: {
      type: Number,
      default: 32,
    },
    data: {
      type: Array,
    },
    emptyText: {
      type: String,
      default() {
        return t("el.tree.emptyText");
      },
    },
    renderAfterExpand: {
      type: Boolean,
      default: true,
    },
    nodeKey: String,
    checkStrictly: Boolean,
    defaultExpandAll: Boolean,
    expandOnClickNode: {
      type: Boolean,
      default: true,
    },
    checkOnClickNode: Boolean,
    checkDescendants: {
      type: Boolean,
      default: false,
    },
    autoExpandParent: {
      type: Boolean,
      default: true,
    },
    defaultCheckedKeys: Array,
    defaultExpandedKeys: Array,
    currentNodeKey: [String, Number],
    renderContent: Function,
    showCheckbox: {
      type: Boolean,
      default: false,
    },
    draggable: {
      type: Boolean,
      default: false,
    },
    allowDrag: Function,
    allowDrop: Function,
    props: {
      default() {
        return {
          children: "children",
          label: "label",
          disabled: "disabled",
        };
      },
    },
    lazy: {
      type: Boolean,
      default: false,
    },
    highlightCurrent: Boolean,
    load: Function,
    filterNodeMethod: Function,
    accordion: Boolean,
    indent: {
      type: Number,
      default: 18,
    },
    iconClass: String,
  },

  data() {
    return {
      store: null,
      root: null,
      currentNode: null,
      treeItems: null,
      checkboxItems: [],
      dragState: {
        showDropIndicator: false,
        draggingNode: null,
        dropNode: null,
        allowDrop: true,
      },
    };
  },

  computed: {
    children: {
      set(value) {
        this.data = value;
      },
      get() {
        return this.data;
      },
    },

    treeItemArray() {
      return Array.prototype.slice.call(this.treeItems);
    },

    isEmpty() {
      const { childNodes } = this.root;
      return !childNodes || childNodes.length === 0 || childNodes.every(({ visible }) => !visible);
    },

    virtualItems() {
      // 优化不需要开启虚拟滚动下的情况
      if (!this.virtualScroll) return;
      return this.flatTree(this.root.childNodes);
    },
  },

  watch: {
    defaultCheckedKeys(newVal) {
      this.store.setDefaultCheckedKey(newVal);
    },

    defaultExpandedKeys(newVal) {
      this.store.defaultExpandedKeys = newVal;
      this.store.setDefaultExpandedKeys(newVal);
    },

    data(newVal) {
      this.store.setData(newVal);
    },

    checkboxItems(val) {
      Array.prototype.forEach.call(val, checkbox => {
        checkbox.setAttribute("tabindex", -1);
      });
    },

    checkStrictly(newVal) {
      this.store.checkStrictly = newVal;
    },
  },

  created() {
    this.isTree = true;

    this.store = new TreeStore({
      key: this.nodeKey,
      data: this.data,
      lazy: this.lazy,
      props: this.props,
      load: this.load,
      currentNodeKey: this.currentNodeKey,
      checkStrictly: this.checkStrictly,
      checkDescendants: this.checkDescendants,
      defaultCheckedKeys: this.defaultCheckedKeys,
      defaultExpandedKeys: this.defaultExpandedKeys,
      autoExpandParent: this.autoExpandParent,
      defaultExpandAll: this.defaultExpandAll,
      filterNodeMethod: this.filterNodeMethod,
    });

    this.root = this.store.root;

    let dragState = this.dragState;
  },

  mounted() {
    this.initTabIndex();
    this.$el.addEventListener("keydown", this.handleKeydown);
  },

  updated() {
    this.treeItems = this.$el.querySelectorAll("[role=treeitem]");
    this.checkboxItems = this.$el.querySelectorAll("input[type=checkbox]");
  },

  methods: {
    // 扁平化数据
    flatTree(childNodes, newTree = []) {
      childNodes.forEach(node => {
        // 兼容搜索
        if (!node.visible) return;
        newTree.push(node);
        if (node.expanded && node.childNodes.length) this.flatTree(node.childNodes, newTree);
      });
      return newTree;
    },

    filter(value) {
      if (!this.filterNodeMethod)
        throw new Error("[Tree] filterNodeMethod is required when filter");
      this.store.filter(value);
    },

    getNodeKey(node) {
      return getNodeKey(this.nodeKey, node.data);
    },

    getNodePath(data) {
      if (!this.nodeKey) throw new Error("[Tree] nodeKey is required in getNodePath");
      const node = this.store.getNode(data);
      if (!node) return [];
      const path = [node.data];
      let parent = node.parent;
      while (parent && parent !== this.root) {
        path.push(parent.data);
        parent = parent.parent;
      }
      return path.reverse();
    },

    getCheckedNodes(leafOnly, includeHalfChecked) {
      return this.store.getCheckedNodes(leafOnly, includeHalfChecked);
    },

    getCheckedKeys(leafOnly) {
      return this.store.getCheckedKeys(leafOnly);
    },

    getCurrentNode() {
      const currentNode = this.store.getCurrentNode();
      return currentNode ? currentNode.data : null;
    },

    getCurrentKey() {
      if (!this.nodeKey) throw new Error("[Tree] nodeKey is required in getCurrentKey");
      const currentNode = this.getCurrentNode();
      return currentNode ? currentNode[this.nodeKey] : null;
    },

    setCheckedNodes(nodes, leafOnly) {
      if (!this.nodeKey) throw new Error("[Tree] nodeKey is required in setCheckedNodes");
      this.store.setCheckedNodes(nodes, leafOnly);
    },

    setCheckedKeys(keys, leafOnly) {
      if (!this.nodeKey) throw new Error("[Tree] nodeKey is required in setCheckedKeys");
      this.store.setCheckedKeys(keys, leafOnly);
    },

    setChecked(data, checked, deep) {
      this.store.setChecked(data, checked, deep);
    },

    getHalfCheckedNodes() {
      return this.store.getHalfCheckedNodes();
    },

    getHalfCheckedKeys() {
      return this.store.getHalfCheckedKeys();
    },

    setCurrentNode(node) {
      if (!this.nodeKey) throw new Error("[Tree] nodeKey is required in setCurrentNode");
      this.store.setUserCurrentNode(node);
    },

    setCurrentKey(key) {
      if (!this.nodeKey) throw new Error("[Tree] nodeKey is required in setCurrentKey");
      this.store.setCurrentNodeKey(key);
    },

    getNode(data) {
      return this.store.getNode(data);
    },

    remove(data) {
      this.store.remove(data);
    },

    append(data, parentNode) {
      this.store.append(data, parentNode);
    },

    insertBefore(data, refNode) {
      this.store.insertBefore(data, refNode);
    },

    insertAfter(data, refNode) {
      this.store.insertAfter(data, refNode);
    },

    handleNodeExpand(nodeData, node, instance) {
      this.broadcast("ElTreeNode", "tree-node-expand", node);
      this.$emit("node-expand", nodeData, node, instance);
    },

    updateKeyChildren(key, data) {
      if (!this.nodeKey) throw new Error("[Tree] nodeKey is required in updateKeyChild");
      this.store.updateChildren(key, data);
    },

    initTabIndex() {
      this.treeItems = this.$el.querySelectorAll(".is-focusable[role=treeitem]");
      this.checkboxItems = this.$el.querySelectorAll("input[type=checkbox]");
      const checkedItem = this.$el.querySelectorAll(".is-checked[role=treeitem]");
      if (checkedItem.length) {
        checkedItem[0].setAttribute("tabindex", 0);
        return;
      }
      this.treeItems[0] && this.treeItems[0].setAttribute("tabindex", 0);
    },

    handleKeydown(ev) {
      const currentItem = ev.target;
      if (currentItem.className.indexOf("el-tree-node") === -1) return;
      const keyCode = ev.keyCode;
      this.treeItems = this.$el.querySelectorAll(".is-focusable[role=treeitem]");
      const currentIndex = this.treeItemArray.indexOf(currentItem);
      let nextIndex;
      if ([38, 40].indexOf(keyCode) > -1) {
        // up、down
        ev.preventDefault();
        if (keyCode === 38) {
          // up
          nextIndex = currentIndex !== 0 ? currentIndex - 1 : 0;
        } else {
          nextIndex = currentIndex < this.treeItemArray.length - 1 ? currentIndex + 1 : 0;
        }
        this.treeItemArray[nextIndex].focus(); // 选中
      }
      if ([37, 39].indexOf(keyCode) > -1) {
        // left、right 展开
        ev.preventDefault();
        currentItem.click(); // 选中
      }
      const hasInput = currentItem.querySelector('[type="checkbox"]');
      if ([13, 32].indexOf(keyCode) > -1 && hasInput) {
        // space enter选中checkbox
        ev.preventDefault();
        hasInput.click();
      }
    },
  },
};
</script>

<style lang="scss">
.g-tree.el-tree {
  height: 100%;

  .virtual-tree__wrapper {
    height: 100%;
  }
}
</style>
