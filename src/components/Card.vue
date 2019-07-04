<template>
  <b-card
    :title="did.alias"
    :sub-title="'ID:'+did.id"
    :img-src="did.avatar"
    img-alt="Avatar Image"
    img-left
    class="mb-3">
    <small>1 Key</small><br>
    <small>42 Claims</small>
    <b-button
      class="float-right"
      size="sm"
      @click="showDID"
      :to="`/vault/dids/${did.alias}`"
      variant="primary">
      VIEW <fa icon="angle-right" />
    </b-button>
  </b-card>
</template>

<script>
// TODO: more compact design for the card
export default {
  name: 'Card',
  props: {
    did: {
      alias: String,
      id: String,
      avatar: String,
      status: String,
    },
    showDID: Function,
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/style/app.scss';
@import '@/assets/style/dids.scss';
</style>
