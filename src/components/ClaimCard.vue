<template>
  <b-card
    :title="`${claim.alias} - ${claim.did.alias}`"
    :sub-title="`ID: ${claim.id}`"
  >
    <small class="text-muted">
      Properties:
      {{ claim.properties }}
    </small>
    <hr>
    <small class="text-muted">
      Witnesses:
      {{ claim.witnesses.map(witness => witness.did.alias).join(', ') }}
    </small>
    <div class="float-right signatures">
      <!--<fa icon="check-circle" class="mr-2 mt-1" /> <small class=" signed">SIGNED</small>-->
      <fa icon="circle-notch" class="mr-2 mt-1" /> <small class="pending">PENDING</small>
    </div>

    <b-button
      size="sm"
      :to="`/vault/claims/${claim.id}`"
      class="view-button ml-3"
      variant="primary">
      VIEW <fa icon="angle-right" />
    </b-button>
  </b-card>
</template>

<script>
// TODO: more compact design for the card
export default {
  name: 'ClaimCard',
  props: {
    claim: {
      id: String,
      alias: String,
      properties: Object,
      did: {
        id: String,
        alias: String,
      },
      witnesses: Array,
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/style/claimcard.scss';
</style>
