<template>
  <b-card no-body>
    <b-card-header>
      <b-card-title>{{ claim.schema_name }}</b-card-title>
      <b-card-sub-title>{{ claim.id }}</b-card-sub-title>
    </b-card-header>
    <b-card-body class="p-0">
      <b-table
        :items="claimTable"
        :fields="['name','value']"
        class="m-0"
        hover
        small
        show-empty
        empty-text="No properties"
      />
    </b-card-body>
    <b-card-footer class="text-right">
      <b-button :to="{ name: 'viewClaim', params: { id: claim.id } }" variant="primary" size="sm">
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
    claimTable() {
      return Object.entries((this.claim || {}).content || {})
        .map(([name, value]) => ({ name, value }));
    },
  },
};
</script>
