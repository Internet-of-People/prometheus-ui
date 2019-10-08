<template>
  <b-container>
    <b-row class="text-center justify-content-md-center" align-h="center">
      <b-col cols="6" md="4" lg="2">
        <b-img :src="require('@/assets/images/logo.svg')" fluid alt="Responsive image" />
      </b-col>
    </b-row>
    <b-row class="text-center">
      <b-col><h1>{{ appName }}</h1></b-col>
    </b-row>
    <b-row class="justify-content-md-center mt-4">
      <b-col cols="12" lg="8">
        Prometheus uses a vault generated from a seed phrase similar to cryptocurrency hardware
        wallets. <strong>This seed is the key to all your data and should you lose it, you lose
        access to all your data, currency and relations.</strong>
        <br>Keep the phrase somewhere safe, preferably multiple copies, split into multiple pieces
        at different locations.
      </b-col>
    </b-row>
    <b-row class="justify-content-center mt-4 text-center">
      <b-col cols="12" lg="8">
        <b-card-group deck>
          <b-card no-body>
            <b-card-body>
              <b-card-text class="text-muted">
                Choose this option if you have no seeds to restore.
                It will generate a new vault with a randomly generated seed.
              </b-card-text>
            </b-card-body>
            <b-card-footer footer-bg-variant="white">
              <b-button @click="createNewVault" variant="primary">CREATE NEW VAULT</b-button>
            </b-card-footer>
          </b-card>
          <b-card no-body>
            <b-card-body>
              <b-card-text class="text-muted">
                If you have an already generated seed and want to restore your vault,
                this is what you need.
              </b-card-text>
            </b-card-body>
            <b-card-footer footer-bg-variant="white">
              <b-button @click="restoreVault" variant="light">RESTORE VAULT</b-button>
            </b-card-footer>
          </b-card>
        </b-card-group>
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
      this.$router.push({ name: 'createNewVault' });
    },
    async restoreVault() {
      this.$router.push({ name: 'validateVault' });
    },
  },
};
</script>

<style scoped lang="scss">
@import './Introduction.scss';
</style>
