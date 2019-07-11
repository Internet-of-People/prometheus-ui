<template>
  <b-button
    @click="createDID"
    class="float-right"
    variant="primary"
  >
    CREATE NEW ID
  </b-button>
</template>

<script>
export default {
  methods: {
    createDID() {
      this.$store.dispatch('createDID');
    },
  },
};
</script>

<style>

</style>
