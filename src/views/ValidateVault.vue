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
        <b-alert :show="showPhraseError" variant="danger">
          The provided phrase was invalid.
        </b-alert>
        <b-alert :show="showVaultInitError" variant="danger">
          <strong>Something went wrong during vault initialization.</strong><br>
          Response from API: {{ apiError }}
        </b-alert>
        <b-button @click="goBack" variant="light" class="mr-4">BACK</b-button>
        <b-button @click="createVault" variant="primary" :disabled="loading">
          CREATE VAULT
          <b-spinner small v-if="loading" />
          <fa icon="angle-right" v-if="!loading" />
        </b-button>
        <b-button variant="outline-primary" @click="demoFill" class="float-right">demo</b-button>
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
      showPhraseError: false,
      showVaultInitError: false,
      loading: false,
      apiError: '',
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
    demoFill() {
      this.words = [];
      for (let i = 0; i < 24; i += 1) {
        this.words[i] = this.$store.state.words[i];
      }
    },
    goBack() {
      this.$store.dispatch('cancelVaultCreation');
      this.$router.push('/');
    },
    async createVault() {
      const reset = () => {
        this.showPhraseError = false;
        this.showVaultInitError = false;
        this.loading = true;
        this.apiError = '';
      };

      reset();
      const phrase = this.words.map(word => word.trim());
      const response = await api.validatePhrase(phrase);

      if (!response.data) {
        this.showPhraseError = true;
        this.loading = false;
        return;
      }

      api.initVault(phrase).then(() => {
        this.$router.push('/vaultcreated');
      }).catch((err) => {
        this.apiError = err.response.data;
        this.showVaultInitError = true;
        this.loading = false;
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/style/createvault.scss';
</style>