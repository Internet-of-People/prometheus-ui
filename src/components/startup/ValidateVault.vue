<template>
  <div class="float-content">
    <div class="info-txt">Please enter all the phrases you have noted in the correct order.</div>
    <div>Providing these words in the correct order ensures us that you noted all those phrases correctly.</div>
    <div v-for="index in 24" :key="index" class="words-txt">{{index+1}}. <input/> </div>
    <div class="btn-block">
      <Button name="BACK" type="inv-btn" :onClick="goBack" />
      <Button name="CREATE VAULT" :onClick="createVault" />
    </div>
  </div>
</template>

<script>
import Button from '@/components/common/Button' 
export default {
  name: 'ValidateVault',
  components: {
    Button
  },
  methods:{
    goBack(){
      this.$store.dispatch('resetPage')
    },
    createVault() {
      this.$store.dispatch('createVault')
    }
  }
}
</script>

<style scoped>
</style>
