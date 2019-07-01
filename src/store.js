import Vue from 'vue';
import Vuex from 'vuex';
import api from './api';
import router from './router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appName: 'PROMETHEUS',
    words: [],
    id: [],
  },
  getters: {
    appName: state => state.appName,
    words: state => state.words,
  },
  actions: {
    async generatePhraseAsync(context) {
      const response = await api.generateVault();
      context.commit('GENERATE_PHRASE', response.data);
    },
    async validatePhraseAsync(context, phrase) {
      const response = await api.validatePhrase(phrase);
      context.commit('VALIDATE_PHRASE', response.data);
    },
    cancelVaultCreation(context) {
      context.commit('CANCEL_VAULT_CREATION');
    },
  },
  mutations: {
    GENERATE_PHRASE: (state, words) => {
      state.words = words;
    },
    CANCEL_VAULT_CREATION: (state) => {
      state.words = [];
    },
    VALIDATE_PHRASE: (state, status) => {
      if (status) {
        router.push('/');
        state.id = [];
      }
    },
  },
});
