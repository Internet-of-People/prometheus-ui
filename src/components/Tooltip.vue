<template>
    <b-alert :show="show" variant="info">
        <p><slot></slot></p>
        <b-button variant="primary" @click="show=false">
            {{ text }}
        </b-button>
    </b-alert>
</template>

<script>
export default {
  name: 'Tooltip',
  props: {
    msg: String,
    text: {
      type: String,
      default: 'DISMISS',
    },
  },
  data() {
    return {
      show: true,
    };
  },
};
</script>
