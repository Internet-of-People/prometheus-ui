<template>
    <b-alert :show="show" variant="info">
        <p>{{msg}}</p>
        <b-button variant="primary" to="" @click="dismissTooltip">
            {{btnValue}}
        </b-button>
    </b-alert>
</template>

<script>
export default {
  name: 'Tooltip',
  props: {
    msg: String,
    btnValue: {
      type: String,
      default: 'OK',
    },
  },
  data() {
    return {
      show: true,
    };
  },
  methods: {
    dismissTooltip() {
      this.show = false;
    },
  },
};
</script>
