<template>
  <div>
    <b-alert show variant="warning">
      Please note down all the following phrases in correct order.
    </b-alert>
    <b-row class="d-flex justify-content-start">
      <b-col>
        <Loader :loading="loading" />
        <template v-for="(word,index) in words">
          <b-input-group
            size="sm"
            :prepend="(index+1)+''"
            :key="index"
            class="mr-2 mb-2 vault-creation-inputs"
          >
            <b-form-input trim readonly :value="word" />
          </b-input-group>
        </template>
      </b-col>
    </b-row>
    <b-row class="clear mt-4" v-if="!loading">
      <b-col>
        <b-button @click="goBack" variant="light" class="mr-4">BACK</b-button>
        <b-button @click="restoreVault" variant="primary">
          I WROTE WORDS DOWN
          <fa icon="angle-right" />
        </b-button>
      </b-col>
    </b-row>
  </div>
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
