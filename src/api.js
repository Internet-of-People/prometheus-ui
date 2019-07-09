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
  generateVault: async () => api.post('/bip39'),
  validatePhrase: async phrase => api.post('/bip39/validate-phrase', phrase),
  initVault: async phrase => api.post('/vault', phrase),
  listDIDs: async () => api.get('/vault/dids'),
  getDID: async didId => api.get(`/vault/dids/${didId}`),
  createDID: async () => api.post('/vault/dids'),
  renameDIDAlias: async (didId, alias) => api.put(`/vault/dids/${didId}/alias`, alias),
  changeDIDAvatar: async (didId, avatar) => api.put(`/vault/dids/${didId}/avatar`, avatar),
  listClaims: async () => api.get('/claims'),
};
