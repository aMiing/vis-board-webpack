<template>
  <div class="operator-group">
    <template v-for="(btn, index) in filterlistBtns">
      <el-link
        v-if="btn.type !== 'expand'"
        :key="btn.id || index"
        :underline="false"
        :disabled="isDisabled(btn)"
        @click="btn.click(data)"
      >
        <el-tooltip v-if="isDisabled(btn) || iconOnly" :content="tooltipText(btn)">
          <div class="btn-item-content">
            <i class="iconfont" :class="btn.iconClass"></i>
            <span v-if="!iconOnly" class="list-name--label">{{ btn.name }}</span>
          </div>
        </el-tooltip>
        <div v-else class="btn-item-content">
          <i class="iconfont" :class="btn.iconClass"></i>
          <span class="list-name--label">{{ btn.name }}</span>
        </div>
      </el-link>
      <el-popover
        v-else
        :key="btn.id"
        :content="btn.name"
        trigger="hover"
        placement="bottom"
        width="80"
        popper-class="popover-operator"
        @show="$emit('popover', data)"
        @hide="$emit('popover', {})"
      >
        <el-link slot="reference" :underline="false">
          <i class="iconfont ml-8 mr-8 icongengduo"></i>
        </el-link>
        <div v-for="expandItem in btn.expandBtns" :key="expandItem.id" class="expand-item">
          <el-tooltip
            v-if="isDisabled(expandItem)"
            placement="right"
            :content="tooltipText(expandItem)"
          >
            <div class="expand-item-content disabled">
              <i class="iconfont" :class="expandItem.iconClass"></i>
              <span class="ml-8">{{ expandItem.name }}</span>
            </div>
          </el-tooltip>
          <div v-else class="expand-item-content" @click="expandItem.click(data)">
            <i class="iconfont" :class="expandItem.iconClass"></i>
            <span class="ml-8">{{ expandItem.name }}</span>
          </div>
        </div>
      </el-popover>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Object,
      default: () => ({}),
    },
    showMaxNum: {
      type: Number,
      default: 5,
    },
    iconOnly: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    filterlistBtns() {
      const tempList = this.options.filter(i => (i.hidden ? !i.hidden(this.data) : true));
      const len = tempList.length;
      if (len > this.showMaxNum) {
        const justList = tempList.slice(0, this.showMaxNum - 1);
        justList[this.showMaxNum - 1] = {
          name: "更多",
          iconClass: "icongengduo",
          expandBtns: [],
          type: "expand",
        };
        justList[this.showMaxNum - 1].expandBtns.push(...tempList.slice(this.showMaxNum - 1, len));
        return justList;
      }
      return tempList;
    },
  },
  methods: {
    isDisabled(btn) {
      return btn.disabled && btn.disabled.cb(this.data);
    },
    tooltipText(btn) {
      const disable = this.isDisabled(btn);
      return disable ? btn.disabled.tips || btn.name + "不可用" : this.iconOnly ? btn.name : "";
    },
  },
};
</script>

<style lang="scss" scoped>
.iconfont {
  font-size: 18px;
}
.btn-item-content {
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 0 8px;
  .list-name--label {
    font-size: 12px;
  }
}
.el-link.el-link--default {
  color: var(--grey-11);
  .iconfont {
    color: var(--grey-12);
  }
  &.is-disabled {
    color: var(--grey-10);
    .iconfont {
      color: var(--grey-10);
    }
  }
}
</style>
