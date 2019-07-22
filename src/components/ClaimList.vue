<template>
  <div>
    <b-table
      :items="claimTable"
      :fields="['name','value','details']"
      class="m-0"
      hover
      show-empty
      empty-text="No properties"
    >
      <template slot="details" slot-scope="data">
        <b-button
          size="sm"
          variant="outline-primary"
          v-b-modal="`'modal-${data.item.claim.id}'`"
        >
          DETAILS
        </b-button>
        <b-modal
          :id="`'modal-${data.item.claim.id}'`"
          :title="`${data.item.name}`"
          ok-only
          ok-title="CLOSE"
        >
          <pre>{{data.item.claim}}</pre>
        </b-modal>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: 'ClaimList',
  props: {
    claims: {
      type: Array,
      required: true,
    },
    schemas: {
      type: Array,
      required: true,
    },
    showDidAlias: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    claimTable() {
      return this.claims.map(claim => ({
        name: claim.schema_name,
        value: this.getClaimValue(claim),
        claim,
      }));
    },
  },
  methods: {
    findClaimSchema(schemaId) {
      const [schema] = this.schemas.filter(item => item.id === schemaId);
      return schema;
    },
    getClaimValue(claim) {
      const schema = this.findClaimSchema(claim.schema_id);
      const values = [];

      if (schema.ordering.length === 0) {
        Object.keys(claim.content).forEach((key) => {
          values.push(claim.content[key]);
        });
      } else {
        schema.ordering.forEach((key) => {
          values.push(claim.content[key]);
        });
      }
      return values.join(' ');
    },
  },
};
</script>
