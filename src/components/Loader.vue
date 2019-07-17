<template>
  <div v-if="loading" class="d-flex align-items-center">
    <b-spinner variant="primary" class="mr-3" />{{text}}
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
