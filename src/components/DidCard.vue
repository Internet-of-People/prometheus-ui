<template>
  <b-card
    :title="did.label"
    :sub-title="'ID:'+did.id"
    :img-src="did.avatar"
    img-alt="Avatar Image"
    img-left
    class="mb-3">
    <b-button
      size="sm"
      variant="primary"
      class="float-right mb-3 text-uppercase"
      @click="onDidCardButtonClick"
    >
      Set to Active
    </b-button>
  </b-card>
</template>

<script>
// TODO: more compact design for the card
export default {
  name: 'DidCard',
  props: {
    did: {
      label: String,
      id: String,
      avatar: String,
      status: String,
    },
  },
  methods: {
    async onDidCardButtonClick() {
      await this.$store.dispatch('setActiveDID', this.did.id);
      this.$router.push({ name: 'viewDID', params: { did: this.did.id } });
    },
  },
};
</script>

<style scoped lang="scss">
@import './DidCard.scss';
</style>
