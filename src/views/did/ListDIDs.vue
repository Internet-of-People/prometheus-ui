<template>
    <div>
      <Loader :loading="loading" />
      <template v-if="!loading">
        <template v-if="dids.length">
          <Tooltip id="dids-tooltip" v-if="dids.length">
            Here you can view your DIDs. Creating a new DID takes seconds. <br>
            After a DID is created, it will by default have a deterministically created
            avatar and alias, but both can easily be changed on the DID's page.
          </Tooltip>
          <FilterBar v-if="dids.length" v-model="searchTerm" />
          <DidCard
            v-for="did in filteredDids"
            :did="did"
            :key="did.id"
          />
        </template>
        <template v-else>
          <b-alert show variant="info" class="mt-3">
            You have no DIDs. Create your first DID ;)<br>
            <b-button
              @click="createNewDID"
              variant="primary"
              class="mt-3">
              CREATE NEW DID
            </b-button>
          </b-alert>
        </template>
        <b-alert
          show
          variant="warning"
          v-if="!filteredDids.length && this.searchTerm.length"
          class="mt-3"
        >
          No DIDs found with the term "{{ this.searchTerm }}"
        </b-alert>
      </template>
    </div>
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
          const filterfields = (({ id, alias }) => ({ id, alias }))(did);
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
