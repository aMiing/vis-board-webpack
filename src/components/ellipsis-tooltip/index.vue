<template lang="pug">
el-tooltip(
  v-model="showTooltip",
  :disabled="!showTooltip",
  effect="dark",
  :placement="placement",
  popper-class="tooltip-wrap"
)
  div(slot="content")
    span(v-if="text") {{ text }}
    slot(v-else-if="$slots.text", name="text")
  span.ellipsis-tooltip-content(@mouseenter="handleMouseenter")
    span(v-if="text") {{ text }}
    slot(v-else-if="$slots.text", name="text")
</template>
<script>
export default {
  name: 'EllipsisTooltip',
  props: {
    placement: {
      type: String,
      default: 'top',
    },
    text: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      showTooltip: false,
    };
  },
  methods: {
    handleMouseenter(event) {
      // this.showTooltip = !(
      //   event.target.getBoundingClientRect().width === event.target.scrollWidth
      // );
      const target = event.target;
      this.showTooltip =
        target.children[0].getBoundingClientRect().width > target.getBoundingClientRect().width;
    },
  },
};
</script>

<style lang="scss" scoped>
.ellipsis-tooltip-content {
  display: inline-block;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
  padding-right: 8px;
  span {
    vertical-align: middle;
  }
}
</style>
