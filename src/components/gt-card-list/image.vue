<template>
  <div class="image" :style="style" @click="onClick">
    <div v-if="loading && src" class="image-load">
      <slot name="placeholder">加载中</slot>
    </div>
    <div v-if="error || !src" class="image-error">
      <slot name="error">加载出错</slot>
    </div>
    <img
      v-if="!error && src"
      class="image-inner"
      :src="src"
      :alt="alt"
      :style="{ 'object-fit': fit }"
      @load="onLoad"
      @error="onError"
    />
  </div>
</template>
<script>
export default {
  props: {
    src: String,
    alt: String,
    fit: {
      type: String,
      default: 'fill',
      validator(value) {
        return ['contain', 'cover', 'fill', 'none', 'scale-down'].includes(value);
      },
    },
    width: {
      type: [String, Number],
      default: '100%',
    },
    height: {
      type: [String, Number],
      default: '100%',
    },
  },
  data() {
    return {
      loading: true,
      error: false,
    };
  },
  computed: {
    style() {
      return {
        width: this.width,
        height: this.height,
      };
    },
  },
  methods: {
    onClick(event) {
      this.$emit('click', event); // 向父节点传递一个自定义事件
    },
    onLoad(event) {
      this.loading = false;
      this.$emit('loading', event); // 向父节点传递一个自定义事件
    },
    onError(event) {
      this.loading = false;
      this.error = true;
      this.$emit('error', event); // 向父节点传递一个自定义事件
    },
  },
};
</script>
<style scoped>
.image {
  position: relative;
  overflow: hidden;
}
.image .image-load,
.image .image-error {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.image img {
  width: 100%;
  height: 100%;
  image-rendering: -webkit-optimize-contrast;
}
</style>
