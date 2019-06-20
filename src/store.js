import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

let apiEndpoint = "http://127.0.0.1:8080"

const store =  new Vuex.Store({
  state: {
    appname: "PROMETHEUS",
    words: []
  },
  actions: {
    createNewVault() {
      axios.get(apiEndpoint+'/vault/generate_phrase')
      .then(response => {
        store.commit('CREATE_NEW_VAULT', response)
      }).catch((error) => {
        store.commit('API_FAIL', error)
      })
    },
    restoreVault() {
      store.commit('RESTORE_VAULT')
    },
    resetPage(){
      store.commit('RESET_VAULT')
    },
    createVault(phrase) {
      axios.get(apiEndpoint+`/vault/validate_phrase/${phrase}`)
      .then(() => {
        store.commit('CREATE_VAULT')
      }).catch((error) => {
        store.commit('API_FAIL', error)
      })
    }
  },
  mutations: {
    'CREATE_NEW_VAULT': function (state, response) {
      store.words = response.data.split(' ')
      router.push('/createnewvault')
    },
    'RESTORE_VAULT': function () {
      router.push('/validatevault')
    },
    'RESET_VAULT': function () {
      router.push('/')
    },
    'CREATE_VAULT': function () {
      router.push('/vaultcreated')
    },
    'API_FAIL': function () {
      // TODO: Add error logging
      // console.error(error) /*eslint no-console: "error"*/
    }
  }
})

export default store
