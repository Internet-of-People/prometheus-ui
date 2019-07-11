<template>
  <div>
    <b-alert show variant="warning">
      NOTE: this data comes from a mock API.
    </b-alert>
    <FilterBar v-if="claims.length" v-model="searchTerm" />
    <ClaimCard
      v-for="claim in filteredClaims"
      :claim="claim"
      :key="claim.id"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { ClaimCard, FilterBar } from '@/components';

export default {
  components: {
    ClaimCard,
    FilterBar,
  },
  computed: {
    ...mapGetters(['claims']),
    filteredClaims() {
      if (this.searchTerm) {
        const filterVal = this.searchTerm.toLowerCase();
        // TODO
        // fat arrow operator (=>) not used to avoid max-len lint issue
        return this.claims.filter((claim) => {
          const filterfields = (({ id, alias }) => ({ id, alias }))(claim);
          return Object.values(filterfields).some(val => val.toLowerCase().includes(filterVal));
        });
      }
      return this.claims;
    },
  },
  data() {
    return {
      searchTerm: '',
    };
  },
};
</script>
