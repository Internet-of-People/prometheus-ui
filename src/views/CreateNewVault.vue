<template>
  <Loader :loading="loading">
    <b-alert show variant="warning">
      Please note down all the following phrases in correct order.
    </b-alert>
    <MnemonicWords :words="words" readonly />
    <b-row class="clear mt-4">
      <b-col>
        <b-button @click="goBack" variant="light" class="mr-4 text-uppercase">Back</b-button>
        <b-button @click="restoreVault" variant="primary" class="text-uppercase">
          I Wrote Words Down
          <fa icon="angle-right" />
        </b-button>
      </b-col>
    </b-row>
  </Loader>
</template>

<script>
import { Loader, MnemonicWords } from '@/components';
import api from '@/api';

export default {
  name: 'CreateNewVault',
  data() {
    return {
      loading: true,
      words: [],
    };
  },
  components: {
    Loader,
    MnemonicWords,
  },
  async beforeCreate() {
    const { data: words } = await api.generateVault();
    this.words = words;
    this.loading = false;
  },
  methods: {
    goBack() {
      this.$router.push({ name: 'intro' });
    },
    restoreVault() {
      this.$router.push({ name: 'validateVault' });
    },
  },
};
</script>
