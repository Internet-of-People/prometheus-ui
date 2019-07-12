<template>
  <b-button
    @click="createDID"
    class="float-right"
    variant="primary"
    :disabled="loading"
  >
    CREATE NEW ID
    <b-spinner small v-if="loading" class="ml-1" />
  </b-button>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    createDID() {
      this.loading = true;
      this.$store.dispatch('createDID').then(() => {
        this.loading = false;
      });
    },
  },
};
</script>

<style>

</style>
