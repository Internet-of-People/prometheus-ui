<template>
  <div class="float-content">
    <div class="info-txt">
      Please note down all the following phrases in correct order.
    </div>
    <div
      v-for="(word,index) in words"
      :key="index"
      class="words-txt"
    >
      {{ index+1 }}. {{ word }}
    </div>
    <div class="btn-block">
      <Button
        type="inv-btn"
        :on-click="goBack"
      >
        BACK
      </Button>
      <Button :on-click="restoreVault">
        WROTE WORDS DOWN
      </Button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Button from '@/components/Button.vue';

export default {
  name: 'CreateNewVault',
  components: {
    Button,
  },
  computed: {
    ...mapGetters(['words']),
  },
  beforeCreate() {
    this.$store.dispatch('generatePhraseAsync');
  },
  methods: {
    goBack() {
      this.$store.dispatch('cancelVaultCreation');
      this.$router.push('/');
    },
    restoreVault() {
      this.$router.push('/validatevault');
    },
  },
};
</script>

<style scoped>
</style>
