<template>
  <b-container fluid>
    <b-row class="text-center justify-content-md-center" align-h="center">
      <b-col sm="2" lg="12">
        <b-img :src="require('@/assets/images/logo.svg')" fluid alt="Responsive image" />
      </b-col>
    </b-row>
    <b-row class="text-center">
      <b-col><h1>{{ appName }}</h1></b-col>
    </b-row>
    <b-row class="justify-content-md-center mt-4">
      <b-col sm="12" lg="8">
        Prometheus uses a vault generated from a seed phrase similar to cryptocurrency hardware
        wallets. This seed is the key to all your data and should you lose it, you lose access
        to all your data, currency and relations.
        <br>Keep the phrase somewhere safe, preferably multiple copies, split into multiple pieces
        at different locations.
      </b-col>
    </b-row>
    <b-row class="justify-content-md-center mt-4 text-center">
      <b-col sm="6" lg="4">
        <b-card>
          <b-card-text class="text-muted">
            Choose this option if you have no seeds to restore.
            It will generate a new vault with a randomly generated seed.
          </b-card-text>
          <b-button @click="createNewVault" variant="primary">CREATE NEW VAULT</b-button>
        </b-card>
      </b-col>
      <b-col sm="6" lg="4">
        <b-card>
          <b-card-text class="text-muted">
            If you have an already generated seed and want to restore your vault,
            this is what you need.
          </b-card-text>
          <b-button @click="restoreVault" variant="light">RESTORE VAULT</b-button>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'Introduction',
  props: {
    appName: {
      type: String,
      default: '',
    },
  },
  methods: {
    async createNewVault() {
      this.$router.push('/createnewvault');
    },
    async restoreVault() {
      this.$router.push('/validatevault');
    },
  },
};
</script>

<style scoped lang="scss">
@import './Introduction.scss';
</style>
