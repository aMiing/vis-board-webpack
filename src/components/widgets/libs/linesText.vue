<template>
  <div
    class="linesText"
    :style="{
      position: Position,
      cursor: Cursor,
      overflow: Overflow,
      width: item.widgetWidth + '%',
      height: item.widgetHeight + '%',
      left: item.widgetLeft + '%',
      top: item.widgetTop + '%',
    }"
  >
    <div
      class="linesText-wrapper"
      :style="{
        fontWeight: item.fontWeight * 10,
        fontFamily: item.fontFamily,
        fontSize: item.fontSize / 20 + 'vw',
        textAlign: item.textAlign,
        lineHeight: item.lineHeight / 10 + 'em',
      }"
    >
      <div>
        <span class="tab" :style="{ width: item.tabWidth + 'vw' }"></span>
        <span class="connect" :style="{ color: item.fontColor }">{{ item.text }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LinesText",
  props: ["item"],
};
</script>

<style scoped lang="scss">
.linesText-wrapper {
  position: absolute;
  width: 100%;
  text-align: center;
  height: 100%;
}
</style>
