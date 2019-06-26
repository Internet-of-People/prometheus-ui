import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);

axios.defaults.baseURL = 'http://127.0.0.1:8080';

export default {
  generateVault: async () => axios.post('/bip39/new'),
  validatePhrase: async phrase => axios.post('/bip39/validate', phrase),
};
