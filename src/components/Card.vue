<template>
  <b-card
    :title="did.alias"
    :sub-title="'ID:'+did.id"
    :img-src="did.avatar"
    img-alt="Avatar Image"
    img-left class="mb-3">
    <b-link href="#" class="card-link">Key</b-link>
    <b-link href="#" class="card-link">Claims</b-link>
    <b-button class="float-right" @click="showDID" variant="primary">VIEW
       <fa icon="angle-right" />
    </b-button>
  </b-card>
</template>

<script>
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
@import '@/assets/style/dids.scss';
</style>
