import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);

axios.defaults.baseURL = 'http://127.0.0.1:8080';

export default {
    generateVault: async () => {
        try {
            return await axios.get('/vault/generate_phrase');
        } catch (err) {
            return err;
        }
    },
    validatePhrase: async (phrase) => {
        try {
            return await axios.get(`/vault/validate_phrase/${phrase}`);
        } catch (err) {
            return err;
        }
    }
}