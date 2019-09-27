<template>
    <Loader :loading="loading">
      <template v-if="dids.length">
        <Tooltip id="dids-tooltip" v-if="dids.length">
          Here you can view your personas. Creating a new persona takes seconds. <br>
          After a persona is created, it will by default have a deterministically created
          avatar and label, but both can easily be changed on the persona's page.
        </Tooltip>
        <FilterBar
          v-if="dids.length"
          v-model="searchTerm"
          text="Type here to filter your personas"
        />
        <DidCard
          v-for="did in filteredDids"
          :did="did"
          :key="did.id"
        />
      </template>
      <template v-else>
        <b-alert show variant="info" class="mt-3">
          You have no DIDs. Why not create one? <fa :icon="['far', 'laugh-wink']" />
          <b-button
            @click="createNewDID"
            variant="primary"
            class="mt-3 d-block text-uppercase">
            Create Your First Persona
          </b-button>
        </b-alert>
      </template>
      <b-alert
        show
        variant="warning"
        v-if="!filteredDids.length && this.searchTerm.length"
        class="mt-3"
      >
        No personas found with the term "{{ this.searchTerm }}"
      </b-alert>
    </Loader>
</template>

<script>
import { mapGetters } from 'vuex';
import {
  DidCard, FilterBar, Loader, Tooltip,
} from '@/components';

export default {
  components: {
    DidCard,
    FilterBar,
    Loader,
    Tooltip,
  },
  data() {
    return {
      loading: true,
      searchTerm: '',
    };
  },
  computed: {
    ...mapGetters(['appLoading', 'dids']),
    filteredDids() {
      if (this.searchTerm) {
        const filterVal = this.searchTerm.toLowerCase();
        return this.dids.filter((did) => {
          const filterfields = (({ id, label }) => ({ id, label }))(did);
          return Object.values(filterfields).some(val => val.toLowerCase().includes(filterVal));
        });
      }
      return this.dids;
    },
  },
  beforeCreate() {
    this.$store.dispatch('listDIDs').then(() => {
      this.loading = false;
    });
  },
  methods: {
    createNewDID() {
      this.$store.dispatch('createDID');
    },
  },
};
</script>
