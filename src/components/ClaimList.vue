<template>
  <div>
    <FilterBar
      v-if="claims.length"
      v-model="searchTerm"
      text="Type here to filter your claims"
    />
    <b-alert
      show
      variant="warning"
      v-if="!claimTable.length && this.searchTerm.length"
      class="mt-3"
    >
      No claims found with the term "{{ this.searchTerm }}"
    </b-alert>
    <b-table
      :items="claimTable"
      :fields="getTableFields()"
      class="mt-3"
      hover
      show-empty
      outlined
      fixed
      empty-text="No properties"
      v-if="claimTable.length"
    >
      <template slot="status">
        <div class="signatures">
          <!--<fa icon="check-circle" class="mr-2 mt-1" /> <small class=" signed">SIGNED</small>-->
          <fa icon="circle-notch" class="mr-2 mt-1" /> <small class="pending">PENDING</small>
        </div>
      </template>
      <template slot="actions" slot-scope="data">
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
          <pre>{{ data.item.claim }}</pre>
        </b-modal>
      </template>
    </b-table>
  </div>
</template>

<script>
import FilterBar from './FilterBar.vue';

export default {
  name: 'ClaimList',
  components: {
    FilterBar,
  },
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
  data() {
    return {
      searchTerm: '',
    };
  },
  computed: {
    claimTable() {
      return this.claims
        .filter(this.filterClaims)
        .map((claim) => {
          const row = {
            name: claim.schema_name,
            value: this.getClaimValue(claim),
            claim,
          };

          if (this.showDidAlias) {
            row.did = claim.subject_alias;
          }

          return row;
        });
    },
  },
  methods: {
    getTableFields() {
      if (this.showDidAlias) {
        return ['name', 'value', 'did', 'status', 'actions'];
      }
      return ['name', 'value', 'status', 'actions'];
    },
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
    filterClaims(claim) {
      const filterVal = this.searchTerm.toLowerCase();
      if (!filterVal) {
        return true;
      }

      /* eslint-disable camelcase */
      const filterfields = (({
        schema_name,
        subject_alias,
      }) => ({ schema_name, subject_alias }))(claim);
      const claimContains = Object
        .values(filterfields)
        .some(val => val.toLowerCase().includes(filterVal));

      let contentContains = false;
      Object.keys(claim.content).forEach((key) => {
        if (claim.content[key].toString().includes(filterVal)) {
          contentContains = true;
        }
      });

      return claimContains || contentContains;
    },
  },
};
</script>
<style scoped lang="scss">
@import './ClaimList.scss';
</style>
