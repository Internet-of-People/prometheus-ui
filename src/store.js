import Vue from 'vue';
import Vuex from 'vuex';
import api from './api';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    appName: 'PROMETHEUS',
    words: []
  },
  getters: {
    appName: (state) => state.appName,
    words: (state) => state.words
  },
  actions: {
    async generatePhraseAsync (context) {
      const response = await api.generateVault();
      context.commit('GENERATE_PHRASE', response.data);
    },
    cancelVaultCreation (context) {
      context.commit('CANCEL_VAULT_CREATION');
    }
  },
  mutations: {
    'GENERATE_PHRASE': (state, words) => {
      state.words = words;
    },
    'CANCEL_VAULT_CREATION': (state) => {
      state.words = [];
    }
  }
});

export default store;
