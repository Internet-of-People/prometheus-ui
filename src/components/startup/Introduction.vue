<template>
  <div class="intro-page">
    <img src="../../assets/images/logo.svg"/>
    <h1>{{ appName }}</h1>
    <div class="intro-content">
      <div class="intro-desc">
        Prometheus uses a vault generated from a seed phrase similar to cryptocurrency hardware wallets. This seed is the key to all your data and should you lose it, you lose access to all your data, currency and relations.<br/>Keep the phrase somewhere safe, preferably multiple copies, split into multiple pieces at different locations.
      </div>
      <div class="intro-action-block">
        <div class="intro-action-block-elem">
          <div class="intro-action-block-elem-desc">
            Choose this option if you have no seeds to restore. It will generate a new vault with a randomly generated seed.
          </div>
          <Button :onClick="createNewVault">CREATE NEW VAULT</Button>
        </div>
        <div class="float-right intro-action-block-elem">
          <div class="intro-action-block-elem-desc">
            If you have an already generated seed and want to restore your vault, this is what you need.
          </div>
          <Button type="inv-btn" :onClick="restoreVault">RESTORE VAULT</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/common/Button';
import router from '@/router';

export default {
    name: 'Introduction',
    props: {
      appName: String,
    },
    components: {
        Button
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
</style>
