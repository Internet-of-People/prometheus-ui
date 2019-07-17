<template>
  <Loader :loading="loading">
    <b-alert show variant="warning">
      Please note down all the following phrases in correct order.
    </b-alert>
    <b-row class="d-flex justify-content-start">
      <b-col cols="6" sm="4" md="3" lg="2" v-for="(word,index) in words" :key="index">
        <b-input-group
          size="sm"
          class="mb-2"
        >
          <b-input-group-addon>
            <b-input-group-text style="width:2rem;" class="justify-content-end">
              {{index+1}}
            </b-input-group-text>
          </b-input-group-addon>
          <b-form-input trim readonly :value="word" />
        </b-input-group>
      </b-col>
    </b-row>
    <b-row class="clear mt-4">
      <b-col>
        <b-button @click="goBack" variant="light" class="mr-4">BACK</b-button>
        <b-button @click="restoreVault" variant="primary">
          I WROTE WORDS DOWN
          <fa icon="angle-right" />
        </b-button>
      </b-col>
    </b-row>
  </Loader>
</template>

<script>
import { mapGetters } from 'vuex';
import { Loader } from '@/components';

export default {
  name: 'CreateNewVault',
  data() {
    return {
      loading: true,
    };
  },
  components: {
    Loader,
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
      this.$router.push({ name: 'intro' });
    },
    restoreVault() {
      this.$router.push({ name: 'validateVault' });
    },
  },
};
</script>
