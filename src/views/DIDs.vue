<template>
    <Content>
      <div v-if="loading" class="d-flex align-items-center">
        <b-spinner variant="primary" class="mr-3" /> Loading...
      </div>
      <div v-else>
        <FilterBar v-model="search"/>
        <Card v-for="did in filterList"
          :did="did" :showDID="showDID" :key="did.id" />
      </div>
    </Content>
</template>

<script>
import { mapGetters } from 'vuex';
import Content from '@/components/Content.vue';
import Card from '@/components/Card.vue';
import FilterBar from '@/components/FilterBar.vue';

export default {
  components: {
    Content,
    Card,
    FilterBar,
  },
  data() {
    return {
      loading: true,
      search: '',
    };
  },
  computed: {
    ...mapGetters(['dids']),
    filterList() {
      const filterVal = this.search.toLowerCase();
      // fat arrow operator (=>) not used to avoid max-len lint issue
      return this.dids.filter((did) => {
        const filterfields = (({ id, alias }) => ({ id, alias }))(did);
        return Object.values(filterfields).some(val => val.toLowerCase().includes(filterVal));
      });
    },
  },
  beforeCreate() {
    this.$store.dispatch('listDIDs').then(() => {
      this.loading = false;
    });
  },
  methods: {
    showDID() {
      // console.log(`view DID${this.search}`);
    },
  },
};
</script>

<style>
</style>
