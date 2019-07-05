import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);

axios.defaults.baseURL = 'http://127.0.0.1:8080';
axios.defaults.crossDomain = true;

export default {
  generateVault: async () => axios.post('/bip39'),
  validatePhrase: async phrase => axios.post('/bip39/validate-phrase', phrase),
  initVault: async phrase => axios.post('/vault', phrase),
  listDIDs: async () => axios.get('/vault/dids'),
  getDID: async didId => axios.get(`/vault/dids/${didId}`),
  createDID: async () => axios.post('/vault/dids'),
  renameDIDAlias: async (didId, alias) => axios.put(`/vault/dids/${didId}/alias`, alias),
  changeDIDAvatar: async (didId, avatar) => axios.put(`/vault/dids/${didId}/avatar`, avatar),
};
