<template>
  <button
    @click="onClick"
    type="button"
    class="btn btn-link p-0 m-0"
  >
    <slot></slot>
  </button>
</template>

<script>
import { openUrl } from '@/os';

export default {
  props: {
    href: {
      required: true,
      type: String,
    },
  },
  methods: {
    onClick() {
      openUrl(this.href);
    },
  },
};
</script>

<style scoped lang="scss">
@import './NativeLink.scss';
</style>
