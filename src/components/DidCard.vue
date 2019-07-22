<template>
  <b-card
    :title="did.alias"
    :sub-title="'ID:'+did.id"
    :img-src="did.avatar"
    img-alt="Avatar Image"
    img-left
    class="mb-3">
    <b-button
      size="sm"
      :to="{ name: 'viewDID', params: { did: did.id } }"
      variant="primary"
      class="float-right mb-3"
    >
      VIEW <fa icon="angle-right" />
    </b-button>
  </b-card>
</template>

<script>
// TODO: more compact design for the card
export default {
  name: 'DidCard',
  props: {
    did: {
      alias: String,
      id: String,
      avatar: String,
      status: String,
    },
  },
};
</script>

<style scoped lang="scss">
@import './DidCard.scss';
</style>
