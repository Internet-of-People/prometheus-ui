import Vue from 'vue';
import Vuex from 'vuex';
import api from './api';
import { version } from '../package.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appName: 'PROMETHEUS',
    words: [],
    dids: [],
    claims: [],
    activeDid: undefined,
    claimSchemas: [],
    version,
  },
  getters: {
    appName: state => state.appName,
    version: state => state.version,
    words: state => state.words,
    dids: state => state.dids,
    claims: state => state.claims,
    activeDid: state => state.activeDid,
    claimSchemas: state => state.claimSchemas,
  },
  actions: {
    // TODO: generic error handling for all API calls
    async authenticate() { // TODO: check it in a different way
      await api.listDIDs();
    },
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
    async getDIDClaims(context, did) {
      const response = await api.getDIDClaims(did);
      context.commit('SET_DID_CLAIMS', { did, claims: response.data });
    },
    async listDIDs(context) {
      const response = await api.listDIDs();
      context.commit('LIST_DIDS', response.data);
    },
    async createDID(context) {
      await api.createDID();
      context.dispatch('listDIDs');
    },
    async renameDIDAlias(context, payload) {
      await api.renameDIDAlias(payload.didId, JSON.stringify(payload.alias));
      context.commit('RENAME_DID_ALIAS', payload);
    },
    async changeDIDAvatar(context, payload) {
      await api.changeDIDAvatar(payload.didId, JSON.stringify(payload.avatar));
      context.commit('CHANGE_DID_AVATAR', payload);
    },
    async listClaims(context) {
      const response = await api.listClaims();
      context.commit('LIST_CLAIMS', response.data);
    },
    async createClaim(context, payload) {
      await api.createClaim(payload.didId, payload.data);
      context.dispatch('listClaims');
    },
    async listClaimSchemas(context) {
      const response = await api.listClaimSchemas();
      context.commit('LIST_CLAIM_SCHEMAS', response.data);
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
    RENAME_DID_ALIAS: (state, payload) => {
      state.dids.map((did) => {
        if (did.id === payload.didId) {
          did.alias = payload.alias;
        }
        return did;
      });
      state.activeDid.alias = payload.alias;
    },
    CHANGE_DID_AVATAR: (state, payload) => {
      state.dids.map((did) => {
        if (did.id === payload.didId) {
          did.avatar = payload.avatar;
        }
        return did;
      });
      state.activeDid.avatar = payload.avatar;
    },
    SET_DID_CLAIMS: (state, payload) => {
      if (payload.did !== state.activeDid.id) return;
      state.activeDid.claims = payload.claims;
    },
    LIST_CLAIMS: (state, claims) => {
      state.claims = claims;
    },
    LIST_CLAIM_SCHEMAS: (state, claimSchemas) => {
      state.claimSchemas = claimSchemas;
    },
  },
});
