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
  getDID: id => api.get(`/vault/dids/${id}`),
  getDIDClaims: id => api.get(`/vault/dids/${id}/claims`),
  createDID: () => api.post('/vault/dids'),
  renameDIDAlias: (id, alias) => api.put(`/vault/dids/${id}/alias`, alias),
  changeDIDAvatar: (id, avatar) => api.put(`/vault/dids/${id}/avatar`, avatar),
  listClaims: () => api.get('/vault/claims'),
  createClaim: (id, content) => api.post(`/vault/dids/${id}/claims`, content),
  listClaimSchemas: () => api.get('/claim-schemas'),
};
