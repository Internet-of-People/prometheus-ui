import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);

const api = axios.create({
  baseURL: 'http://127.0.0.1:8080',
  crossDomain: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  generateVault: () => api.post('/bip39'),
  validatePhrase: phrase => api.post('/bip39/validate-phrase', phrase),
  initVault: phrase => api.post('/vault', phrase),
  listDIDs: () => api.get('/vault/dids'),
  getDID: didId => api.get(`/vault/dids/${didId}`),
  createDID: () => api.post('/vault/dids'),
  renameDIDAlias: (didId, alias) => api.put(`/vault/dids/${didId}/alias`, alias),
  changeDIDAvatar: (didId, avatar) => api.put(`/vault/dids/${didId}/avatar`, avatar),
  listClaims: () => api.get('/vault/claims'),
  createClaim: (didId, cpntent) => api.post(`/vault/dids/${didId}/claims`, cpntent),
  listClaimSchemas: () => api.get('/claim-schemas'),
};
