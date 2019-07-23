<template>
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

    <ClaimList
      :claims="claims"
      :schemas="claimSchemas"
      showDidAlias
    />
  </Loader>
</template>

<script>
import { mapGetters } from 'vuex';
import { ClaimList, Loader } from '@/components';

export default {
  components: {
    ClaimList,
    Loader,
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
};
</script>
