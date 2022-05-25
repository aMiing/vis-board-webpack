<template>
  <div class="g-block-group" :class="{ '--week': type === 'week' }">
    <div
      v-for="item in data"
      :key="item.key"
      class="g-block-group__item"
      :class="{
        '--last-day': item.last,
        '--selected': value.includes(item.key),
        '--disabled': readonly && !value.includes(item.key),
      }"
      @click="singleSelect ? handleSingleSelect(item.key) : handleItemClick(item.key)"
    >
      {{ item.value }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlockGroup',
  inject: ['updateCron'],
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    type: {
      type: String,
      default: () => 'month',
    },
    value: {
      type: Array,
      default: () => [],
    },
    readonly: {
      type: Boolean,
      default: () => false,
    },
    singleSelect: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      data: [],
      cacheValue: [],
    };
  },
  watch: {
    type: {
      immediate: true,
      handler(type) {
        const strategy = {
          week: () => [
            { key: 2, value: '周一' },
            { key: 3, value: '周二' },
            { key: 4, value: '周三' },
            { key: 5, value: '周四' },
            { key: 6, value: '周五' },
            { key: 7, value: '周六' },
            { key: 1, value: '周日' },
          ],
          month: () => {
            const result = Array(31)
              .fill(0)
              .map((item, i) => ({ key: i + 1, value: i + 1 }));
            result.push({ key: 'L', value: '当月最后一天', last: true });
            return result;
          },
          default: () => [],
        };
        const execute = strategy[type] || strategy.default;
        this.data = execute();
      },
    },
    value: {
      immediate: true,
      deep: true,
      handler() {
        this.updateCron();
      },
    },
  },
  methods: {
    handleItemClick(key) {
      if (this.readonly) return;
      const { value } = this;

      const index = value.indexOf(key);
      // 1.取消选中 2.仅剩下最后一个 3.取消当月最后一天会恢复之前的选择
      if (index > -1 && value.length === 1 && key !== 'L') {
        this.$message && this.$message.error('请至少选择一天～');
        return;
      }

      if (key === 'L') {
        if (index > -1) {
          this.$emit('change', [...this.cacheValue]);
          this.cacheValue = [];
        } else {
          this.cacheValue = [...value];
          this.$emit('change', [key]);
        }
      } else {
        if (index > -1) {
          value.splice(index, 1);
        } else {
          value.push(key);
          const keyIndex = value.indexOf('L');
          if (keyIndex > -1) value.splice(keyIndex, 1);
        }
      }
    },
    handleSingleSelect(key) {
      if (this.readonly) return;
      this.$emit('change', [key]);
    },
  },
};
</script>

<style lang="scss" scoped>
.g-block-group {
  width: 245px;
  display: flex;
  flex-wrap: wrap;
  margin-top: 4px;
  margin-bottom: 8px;
  user-select: none;

  &.--week .g-block-group__item {
    width: 38px;
  }

  &__item {
    position: relative;
    flex-shrink: 0;
    width: 29px;
    height: 22px;
    line-height: 22px;
    text-align: center;
    font-size: 12px;
    color: var(--grey-12, #cad8f9);
    background: var(--grey-6, #343e61);
    border-radius: 2px;
    margin-right: 4px;
    margin-top: 4px;
    cursor: pointer;

    &.--disabled {
      color: var(--grey-10);
      cursor: not-allowed;
    }
    border: 1px solid var(--grey-6, #343e61);

    &.--last-day {
      width: 79px;
    }

    &.--selected {
      border: 1px solid var(--blue-6, #28b0f3);
      color: var(--blue-6, #28b0f3);

      &::after {
        content: '';
        position: absolute;
        right: 0;
        bottom: 0;
        display: block;
        width: 10px;
        height: 10px;
        background-image: url(./icon/selected.svg);
      }
    }
  }
}
</style>
