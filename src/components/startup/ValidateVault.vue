<template>
  <div class="float-content">
    <div class="info-txt">Please enter all the phrases you have noted in the correct order.</div>
    <div>Providing these words in the correct order ensures us that you noted all those phrases correctly.</div>
    <div v-for="index in 24" :key="index" class="words-txt">{{index}}. <input v-model="words[index-1]" /></div>
    <div class="btn-block">
      <Button type="inv-btn" :onClick="goBack">BACK</Button>
      <Button :onClick="createVault">CREATE VAULT</Button>
    </div>
  </div>
</template>

<script>
import router from '@/router';
import Button from '@/components/common/Button';

export default {
  name: 'ValidateVault',
  data() {
    return {
      words:[]
    };
  },
  components: {
    Button
  },
  created(){
    for(let i=0; i<24; i++){
      this.words.push('');
    }
  },
  methods:{
    goBack(){
      this.$store.dispatch('cancelVaultCreation');
      router.push('/');
    },
    createVault() {
      const phrase = this.words.map(word => word.trim()).join(' ');
      this.api.validatePhrase(phrase);
    }
  }
}
</script>

<style scoped>
</style>
