import Vue from 'vue';
import Vuex from 'vuex';
import api from './api';
import { version } from '../package.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appName: 'PROMETHEUS',
    appIsInitializing: true,
    dids: [],
    activeDid: undefined,
    activeDidClaims: [],
    claims: [],
    claimSchemas: [],
    version,
    words: [],
  },
  getters: {
    appName: state => state.appName,
    appIsInitializing: state => state.appIsInitializing,
    version: state => state.version,
    dids: state => state.dids,
    activeDid: state => state.activeDid,
    activeDidClaims: state => state.activeDidClaims,
    claims: state => state.claims,
    claimSchemas: state => state.claimSchemas,
    words: state => state.words,
  },
  plugins: [async (store) => {
    store.state.appIsInitializing = true;

    try {
      const activeDidResp = await api.getActiveDIDID();

      if (activeDidResp.data) {
        await Promise.all([
          store.dispatch('setActiveDID', activeDidResp.data),
          store.dispatch('listDIDs'),
          store.dispatch('listClaimSchemas'),
        ]);
      }
    } catch (e) {
      // app is not yet authenticated
    }

    store.state.appIsInitializing = false;
  }],
  actions: {
    // TODO: generic error handling for all API calls
    async listDIDs(context) {
      const response = await api.listDIDs();
      context.commit('LIST_DIDS', response.data);
    },
    async createDID(context) {
      const resp = await api.createDID();
      await context.dispatch('listDIDs');
      return resp.data;
    },
    async setActiveDID(context, activeDidId) {
      await api.setActiveDIDID(activeDidId);
      const response = await api.getDID(activeDidId);
      context.commit('SET_ACTIVE_DID', response.data);
    },
    async renameDIDLabel(context, label) {
      await api.renameDIDLabel(label);
      context.commit('RENAME_DID_LABEL', label);
      return label;
    },
    async changeDIDAvatar(context, avatar) {
      await api.changeDIDAvatar(JSON.stringify(avatar));
      context.commit('CHANGE_DID_AVATAR', avatar);
    },
    async listClaims(context) {
      const response = await api.listClaims();
      context.commit('LIST_CLAIMS', response.data);
    },
    async listActiveDidClaims(context) {
      const response = await api.getDIDClaims(context.state.activeDid.id);
      context.commit('LIST_ACTIVE_DID_CLAIMS', response.data);
    },
    async createClaim(context, payload) {
      const { data } = await api.createClaim(payload);
      await context.dispatch('listClaims');
      return data;
    },
    async listClaimSchemas(context) {
      const response = await api.listClaimSchemas();
      context.commit('LIST_CLAIM_SCHEMAS', response.data);
    },
    async getWords(context) {
      const response = await api.generateVault();
      context.commit('SET_WORDS', response.data);
    },
    clearWords(context) {
      context.commit('SET_WORDS', []);
    },
  },
  mutations: {
    SET_ACTIVE_DID: (state, did) => {
      state.activeDid = did;
    },
    LIST_DIDS: (state, dids) => {
      state.dids = dids;
    },
    RENAME_DID_LABEL: (state, label) => {
      state.dids.map((did) => {
        if (did.id === state.activeDid.id) {
          did.label = label;
        }
        return did;
      });
    },
    CHANGE_DID_AVATAR: (state, avatar) => {
      state.dids.map((did) => {
        if (did.id === state.activeDid.id) {
          did.avatar = avatar;
        }
        return did;
      });
    },
    LIST_CLAIMS: (state, claims) => {
      state.claims = claims;
    },
    LIST_ACTIVE_DID_CLAIMS: (state, claims) => {
      state.activeDidClaims = claims;
    },
    LIST_CLAIM_SCHEMAS: (state, claimSchemas) => {
      state.claimSchemas = claimSchemas;
    },
    SET_WORDS: (state, words) => {
      state.words = words;
    },
  },
});
