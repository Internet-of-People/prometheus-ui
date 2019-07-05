import Vue from 'vue';
import Vuex from 'vuex';
import api from './api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appName: 'PROMETHEUS',
    words: [],
    dids: [],
    activeDid: undefined,
  },
  getters: {
    appName: state => state.appName,
    words: state => state.words,
    dids: state => state.dids,
    activeDid: state => state.activeDid,
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
    async getDID(context, did) {
      const response = await api.getDID(did);
      context.commit('GET_DID', response.data);
    },
    async listDIDs(context) {
      const response = await api.listDIDs();
      context.commit('LIST_DIDS', response.data);
    },
    async renameDIDAlias(context, did, alias) {
      await api.renameDIDAlias(this.activeDid.id, this.alias);
      context.commit('RENAME_DID_ALIAS', did, alias);
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
    GET_DID: (state, did) => {
      state.activeDid = did;
    },
    RENAME_DID_ALIAS: (state, didId, alias) => {
      state.dids.map((did) => {
        if (did.id === didId) {
          did.alias = alias;
        }
        return did;
      });
      state.activeDid.alias = alias;
    },
  },
});
