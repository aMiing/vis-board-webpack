<template>
  <div
    class="scrollText"
    :style="{
      position: Position,
      cursor: Cursor,
      overflow: Overflow,
      width: item.widgetWidth + '%',
      height: item.widgetHeight + '%',
      left: item.widgetLeft + '%',
      top: item.widgetTop + '%',
    }"
  ></div>
</template>

<script>
export default {
  props: ["item"],
};
</script>

<style slot-scope lang="scss"></style>
