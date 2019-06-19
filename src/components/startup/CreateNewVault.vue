<template>
  <div class="float-content">
    <div class="info-txt">Please note down all the following phrases in correct order.</div>
    <div v-for="(word,index) in words" :key="index" class="words-txt">{{index+1}}. {{word}}</div>
    <div class="btn-block">
      <Button name="BACK" type="inv-btn" :onClick="goBack" />
      <Button name="WROTE WORDS DOWN" :onClick="restoreVault" />
    </div>
  </div>
</template>

<script>
import Button from '@/components/common/Button'
export default {
  name: 'CreateNewVault',
  components: {
    Button
  },
  data: function () {
    return {
      // TODO: replace with store val of words
      words: ["ac", "cac", "mac"]
    }
  },
  methods: {
    goBack(){
      this.$store.dispatch('resetPage')
    },
    restoreVault() {
      this.$store.dispatch('restoreVault')
    }
  }
}
</script>

<style scoped>
</style>
