<template>
    <Content>
      <div v-if="loading" class="d-flex align-items-center">
        <b-spinner variant="primary" class="mr-3" /> Loading...
      </div>
      <div v-for="did in dids" :key="did.id" class="card">
        <div class="inner-card-block">
          <img :src="did.avatar" />
          <div class="float-right">
            <h3>{{did.alias}}</h3>
            <div class="card-info">ID:{{did.id}}</div>
          </div>
        </div>
        <div class="inner-card-block">
          <div class="card-info">
            <div>Key</div>
            <div>Claims</div>
          </div>
            <b-button class="float-right" @click="showDID" variant="primary">
              VIEW
              <fa icon="angle-right" />
            </b-button>
        </div>
      </div>
    </Content>
</template>

<script>
import { mapGetters } from 'vuex';
import Content from '@/components/Content.vue';

export default {
  components: {
    Content,
  },
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    ...mapGetters(['dids']),
  },
  beforeCreate() {
    this.$store.dispatch('listDIDs').then(() => {
      this.loading = false;
    });
  },
  methods: {
    showDID() {
      console.log('view DID');
    },
  },
};
</script>

<style>

</style>
<style scoped lang="scss">
@import '@/assets/style/dids.scss';
</style>
