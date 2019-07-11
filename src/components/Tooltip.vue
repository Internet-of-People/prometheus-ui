<template>
    <b-alert :show="show" variant="info">
        <p><slot></slot></p>
        <b-button variant="primary" @click="hide">
            {{ text }}
        </b-button>
    </b-alert>
</template>

<script>
export default {
  name: 'Tooltip',
  props: {
    id: {
      type: String,
      required: true,
    },
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
  beforeMount() {
    this.show = !localStorage.getItem(this.id);
  },
  methods: {
    hide() {
      localStorage.setItem(this.id, true);
      this.show = false;
    },
  },
};
</script>
