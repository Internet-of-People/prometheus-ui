<template>
  <div class="float-id-content">
    <div class="info-txt">
      Your Vault has been created!
    </div>
    <div class="info-desc">
      Now that we have our vault in place, we can begin creating profiles or as we call IDs.
      Each ID has an encrypted key. IDs have claims associated like Application Usage,
      charting and Performance measurements.
      More on that later, let's begin with creating your initial ID.
    </div>
    <b-button @click="createID" variant="primary">CREATE NEW ID</b-button>
  </div>
</template>

<script>
export default {
  name: 'VaultCreation',
  methods: {
    createID() {
      // TODO: add createID logic
      // console.log('create new id');
    },
  },
};
</script>

<style scoped>
</style>
