<template>
  <div>
    <h3 class="mb-3 text-primary">All Claims</h3>
    <Loader :loading="loading">
      <b-alert v-if="!claims.length" show variant="info">
        You have no claims yet. Why not create one? <fa :icon="['far', 'laugh-wink']" /><br>
        <b-button
          to="/vault/claims/create"
          variant="primary"
          class="mt-3 text-uppercase"
        >
          Create Your First Claim
        </b-button>
      </b-alert>

      <Tooltip id="claim-list-tooltip">
        This page provides an overview over the claims you have created about your personas.
        You can request more and more signatures from people you want to attest your statements.
      </Tooltip>

      <ClaimList
        :claims="claims"
        :schemas="claimSchemas"
        showDidLabel
        @listUpdated="refreshClaimList"
      />
    </Loader>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { ClaimList, Loader, Tooltip } from '@/components';

export default {
  components: {
    ClaimList,
    Loader,
    Tooltip,
  },
  computed: {
    ...mapGetters(['claims', 'claimSchemas']),
  },
  beforeCreate() {
    this.$store.dispatch('listClaims').then(() => {
      this.loading = false;
    });
  },
  data() {
    return {
      loading: true,
    };
  },
  methods: {
    async refreshClaimList() {
      await this.$store.dispatch('listClaims');
    },
  },
};
</script>
