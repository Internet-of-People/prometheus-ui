<template>
  <div v-if="loading" class="d-flex align-items-center" key="loading-in-progress">
    <b-spinner variant="primary" class="mr-3" />{{ text }}
  </div>
  <div v-else key="loading-finished">
    <slot />
  </div>
</template>
<script>
export default {
  name: 'Loader',
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: 'Loading...',
    },
  },
};
</script>
