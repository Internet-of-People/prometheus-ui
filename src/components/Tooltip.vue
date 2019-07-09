<template>
    <b-alert :show="show" variant="info">
        <p><slot></slot></p>
        <b-button variant="primary" @click="show=false">
            {{ text }}
        </b-button>
    </b-alert>
</template>

<script>
// TODO: tooltip must have a kind of id, so it can manage in cookies that the user
// already clicked on dismiss
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
