<template>
  <b-container>
    <b-row class="text-center">
      <b-col><img id="intro-logo" src="@/assets/images/logo.svg"></b-col>
    </b-row>
    <b-row class="text-center">
      <b-col><h1>{{ appName }}</h1></b-col>
    </b-row>
    <b-row class="justify-content-md-center">
      <b-col cols="8">Prometheus uses a vault generated from a seed phrase similar to cryptocurrency hardware wallets. This seed is the key to all your data and should you lose it, you lose access to all your data, currency and relations.<br>Keep the phrase somewhere safe, preferably multiple copies, split into multiple pieces at different locations.</b-col>
    </b-row>
    <b-row class="justify-content-md-center">
      <b-col cols="4">
        Choose this option if you have no seeds to restore. It will generate a new vault with a randomly generated seed.
        <b-button @click="createNewVault" block variant="primary">CREATE NEW VAULT</b-button>
      </b-col>
      <b-col cols="4">
        If you have an already generated seed and want to restore your vault, this is what you need.
        <b-button @click="restoreVault" block variant="light">RESTORE VAULT</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import router from '@/router';

export default {
    name: 'Introduction',
    props: {
      appName: {
        type: String,
        default: ''
      },
    },
    methods: {
        async createNewVault () {
          router.push('/createnewvault');
        },
        async restoreVault () {
          router.push('/validatevault');
        }
    }
};
</script>

<style scoped>
img#intro-logo {
  width: 200px;
}
</style>
