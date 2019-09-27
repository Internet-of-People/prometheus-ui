import Vue from 'vue';
import Vuex from 'vuex';
import api from './api';
import { version } from '../package.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appName: 'PROMETHEUS',
    dids: [],
    activeDid: undefined,
    claims: [],
    claimSchemas: [],
    version,
  },
  getters: {
    appName: state => state.appName,
    version: state => state.version,
    dids: state => state.dids,
    activeDid: state => state.activeDid,
    claims: state => state.claims,
    claimSchemas: state => state.claimSchemas,
  },
  actions: {
    // TODO: generic error handling for all API calls
    async authenticate() { // TODO: check it in a different way
      await api.listDIDs();
    },
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

      const response = await api.listDIDs();
      context.commit('LIST_DIDS', response.data);

      const activeDid = response.data.filter(did => did.id === activeDidId)[0];
      context.commit('SET_ACTIVE_DID', activeDid);
    },
    async renameDIDLabel(context, label) {
      console.log(label);
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
    async createClaim(context, payload) {
      const { data } = await api.createClaim(payload);
      await context.dispatch('listClaims');
      return data;
    },
    async listClaimSchemas(context) {
      const response = await api.listClaimSchemas();
      context.commit('LIST_CLAIM_SCHEMAS', response.data);
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
    LIST_CLAIM_SCHEMAS: (state, claimSchemas) => {
      state.claimSchemas = claimSchemas;
    },
  },
});
