<template>
  <div class="intro-page">
    <img src="../../assets/images/logo.svg"/>
    <h1>PROMETHEUS</h1>
    <div class="intro-content">
      <div class="intro-desc">
        Prometheus uses a vault generated from a seed phrase similar to cryptocurrency hardware wallets. This seed is the key to all your data and should you lose it, you lose access to all your data, currency and relations.<br/>Keep the phrase somewhere safe, preferably multiple copies, split into multiple pieces at different locations.
      </div>
      <div class="intro-action-block">
        <div class="intro-action-block-elem">
          <div class="intro-action-block-elem-desc">
            Choose this option if you have no seeds to restore. It will generate a new vault with a randomly generated seed.
          </div>
          <Button name="CREATE NEW VAULT" :onClick="createNewVault" />
        </div>
        <div class="float-right intro-action-block-elem">
          <div class="intro-action-block-elem-desc">
            If you have an already generated seed and wan to restore your vault, this is what you need.
          </div>
          <Button name="RESTORE VAULT" type="inv-btn" :onClick="restoreVault" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/common/Button'
export default {
  name: 'Introduction',
  components: {
    Button,
  },
  methods: {
    // TODO: fix repition here
    createNewVault() {
      this.$store.dispatch('createNewVault')
    },
    restoreVault() {
      this.$store.dispatch('restoreVault')
    }
  }
}
</script>

<style scoped>
</style>
