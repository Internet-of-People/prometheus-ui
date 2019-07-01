<template>
  <Content>
    <b-alert show variant="warning">
      <strong>Please enter all the phrases you have noted in the correct order.</strong><br>
      Providing these words in the correct order ensures us that you noted
      all those phrases correctly.
    </b-alert>
    <b-row class="d-flex justify-content-start">
      <b-col>
        <template v-for="(word,index) in words">
          <b-input-group
            size="sm"
            :prepend="(index+1)+''"
            :key="index"
            class="mr-2 mb-2"
          >
            <b-form-input trim  v-model="words[index]" />
          </b-input-group>
        </template>
      </b-col>
    </b-row>
    <b-row class="clear mt-4">
      <b-col>
        <b-button @click="goBack" variant="light" class="mr-4">BACK</b-button>
        <b-button @click="createVault" variant="primary">
          CREATE VAULT
          <fa icon="angle-right" />
        </b-button>
      </b-col>
    </b-row>
  </Content>
</template>

<script>
import api from '@/api';
import Content from '@/components/Content.vue';

export default {
  name: 'ValidateVault',
  data() {
    return {
      words: [],
    };
  },
  components: {
    Content,
  },
  created() {
    for (let i = 0; i < 24; i += 1) {
      this.words.push('');
    }
  },
  methods: {
    goBack() {
      this.$store.dispatch('cancelVaultCreation');
      this.$router.push('/');
    },
    createVault() {
      const phrase = this.words.map(word => word.trim());
      api.validatePhrase(phrase).then(() => {
        this.$router.push('/vaultcreated');
      });
      // TODO: if the phrase is valid, we have to call the initVault api,
      // then redirect to the IDs page.
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/style/createvault.scss';
</style>
