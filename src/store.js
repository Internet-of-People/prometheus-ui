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
    async createDID(context) {
      const response = await api.createDID();
      if (response.status === 201) {
        context.dispatch('listDIDs');
      }
    },
  },
  mutations: {
    GENERATE_PHRASE: (state, words) => {
      state.words = words;
    },
    CANCEL_VAULT_CREATION: (state) => {
      state.words = [];
    },
    LIST_DIDS: (state, dids) => {
      state.dids = dids;
    },
  },
});
