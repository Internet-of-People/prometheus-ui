import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);

axios.defaults.baseURL = 'http://127.0.0.1:8080';
axios.defaults.crossDomain = true;

export default {
  generateVault: async () => axios.post('/bip39'),
  validatePhrase: async phrase => axios.post('/bip39/validate_phrase', phrase),
  initVault: async phrase => axios.post('/vault', phrase),
  listDIDs: async () => axios.get('/vault/dids'),
  createDID: async () => axios.post('/vault/dids'),
  renameDIDAlias: async (did, alias) => axios.put(`/vault/dids/${did}/alias`, alias),
};
