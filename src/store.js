import Vue from 'vue';
import Vuex from 'vuex';
import api from './api';

Vue.use(Vuex);

const store =  new Vuex.Store({
  state: {
    appName: "PROMETHEUS",
    words: []
  },
  getters: {
    appName: state => state.appName,
    words: state => state.words
  },
  actions: {
    generateVault() {
        api.generateVault().then((response) => {
            store.commit('GENERATE_VAULT', response.data.split(' '));
        });
    },
    restoreVault() {
      store.commit('RESTORE_VAULT');
    },
    cancelVaultCreation(){
      store.commit('CANCEL_VAULT_CREATION');
    },
    async validatePhrase() {
    //async validatePhrase(state, phrase) {
        //api.validatePhrase().then((response) => {

        //});
    }
  },
  mutations: {
    'GENERATE_VAULT': (state, words) => {
      state.words = words;
    },
    'CANCEL_VAULT_CREATION': (state) => {
      state.words = [];
    }
  }
});

export default store;
