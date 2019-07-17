<template>
  <b-card no-body class="mw-50">
    <b-card-header>
      <b-card-title>{{claim.schema_name}}</b-card-title>
      <b-card-sub-title>{{claim.id}}</b-card-sub-title>
    </b-card-header>
    <b-card-body class="p-0">
      <b-table :items="claim_table" :fields="['name','value']" class="m-0"
               hover small show-empty empty-text="No properties" />
      <!-- <b-card-text class="text-muted">{{JSON.stringify(claim.content)}}</b-card-text> -->
      <!-- <b-card-text text-tag="pre">{{claim.content}}</b-card-text> -->
    </b-card-body>
    <b-card-footer class="text-right">
      <b-button :to="`/vault/claims/${claim.id}`" variant="primary" size="sm">
        VIEW <fa icon="angle-right" />
      </b-button>
    </b-card-footer>
  </b-card>
</template>

<script>
export default {
  name: 'ClaimCard2',
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
  computed: {
    claim_table() {
      return Object.entries((this.claim || {}).content || {})
        .map(([name, value]) => ({ name, value }));
    },
  },
};
</script>
