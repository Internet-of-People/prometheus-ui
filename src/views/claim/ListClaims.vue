<template>
  <div>
    <Loader :loading="loading" />
    <template v-if="!loading">
      <FilterBar v-if="claims.length" v-model="searchTerm" />
      <ClaimCard
        v-for="claim in filteredClaims"
        :claim="claim"
        :key="claim.id"
      />
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { ClaimCard, FilterBar, Loader } from '@/components';

export default {
  components: {
    ClaimCard,
    FilterBar,
    Loader,
  },
  computed: {
    ...mapGetters(['claims']),
    filteredClaims() {
      if (this.searchTerm) {
        const filterVal = this.searchTerm.toLowerCase();
        return this.claims.filter((claim) => {
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
            if (Number.isNaN(claim.content[key]) && claim.content[key].includes(filterVal)) {
              contentContains = true;
            }
          });

          return claimContains || contentContains;
        });
      }
      return this.claims;
    },
  },
  beforeCreate() {
    this.$store.dispatch('listClaims').then(() => {
      this.loading = false;
    });
  },
  data() {
    return {
      loading: false,
      searchTerm: '',
    };
  },
};
</script>
