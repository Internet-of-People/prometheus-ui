<template>
  <b-container class="content p-4 pr-0">
    <b-container class="inner-content p-4 pr-0">
      <b-alert show variant="warning">
        Please note down all the following phrases in correct order.
      </b-alert>
      <b-row class="d-flex justify-content-start">
        <b-col>
          <div v-if="loading" class="d-flex align-items-center">
            <b-spinner variant="primary" class="mr-3" /> Loading...
          </div>

          <template v-for="(word,index) in words">
            <b-input-group
              size="sm"
              :prepend="(index+1)+''"
              :key="index"
              class="mr-2 mb-2"
            >
              <b-form-input trim readonly :value="word" />
            </b-input-group>
          </template>
        </b-col>
      </b-row>
      <b-row class="clear" v-if="!loading">
        <b-col>
          <b-button @click="goBack" variant="light">BACK</b-button>
          <b-button @click="restoreVault" variant="primary">WROTE WORDS DOWN</b-button>
        </b-col>
      </b-row>
    </b-container>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CreateNewVault',
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    ...mapGetters(['words']),
  },
  beforeCreate() {
    this.$store.dispatch('generatePhraseAsync').then(() => {
      this.loading = false;
    });
  },
  methods: {
    goBack() {
      this.$store.dispatch('cancelVaultCreation');
      this.$router.push('/');
    },
    restoreVault() {
      this.$router.push('/validatevault');
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/style/app.scss';

.input-group {
  width: 8rem;
  display: inline-block;

  .input-group-prepend {
    display: inline-block;
    width: 2rem;
  }

  input {
    display: inline-block;
    width: 6rem;
  }
}
</style>
