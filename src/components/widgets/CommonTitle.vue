<template>
  <div
    ref="commonText"
    class="widget"
    :style="{
      width: data.width + 'px',
      height: data.height + 'px',
      fontWeight: data.fontWeight,
      fontFamily: data.fontFamily,
      fontSize: data.fontSize + 'px',
      textAlign: data.textAlign,
      color: data.color,
      lineHeight: data.height + 'px',
    }"
  >
    <div>
      <!-- <a
        class="connect"
        :href="data.url"
        :target="data.target"
        :style="{ color: data.fontColor }"
        >{{ data.text }}</a
      > -->
      {{ data.text }}
    </div>
  </div>
</template>

<script>
export default {
  name: "CommonTitle",
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {};
  },
  mounted: function () {},
  methods: {},
};
</script>

<style scoped lang="scss"></style>
