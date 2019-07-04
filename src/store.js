import Vue from 'vue';
import Vuex from 'vuex';
import api from './api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appName: 'PROMETHEUS',
    words: [],
    dids: [],
  },
  getters: {
    appName: state => state.appName,
    words: state => state.words,
    dids: state => state.dids,
  },
  actions: {
    // TODO: generic error handling for all API calls
    async generatePhraseAsync(context) {
      const response = await api.generateVault();
      context.commit('GENERATE_PHRASE', response.data);
    },
    cancelVaultCreation(context) {
      context.commit('CANCEL_VAULT_CREATION');
    },
    async listDIDs(context) {
      const response = await api.listDIDs();
      context.commit('LIST_DIDS', response.data);
    },
  },
  mutations: {
    GENERATE_PHRASE: (state, words) => {
      state.words = words;
    },
    CANCEL_VAULT_CREATION: (state) => {
      state.words = [];
      state.dids = [];
    },
    LIST_DIDS: (state, dids) => {
      state.dids = dids;
    },
  },
});
