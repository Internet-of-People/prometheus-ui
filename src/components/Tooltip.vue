<template>
    <b-alert v-show="show" show variant="info">
        <p>{{msg}}</p>
        <b-button variant="primary" to="" @click="dismissTooltip">
            OK
        </b-button>
    </b-alert>
</template>

<script>
export default {
  name: 'Tooltip',
  props: {
    msg: String,
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
