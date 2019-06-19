import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'

Vue.use(Vuex)

const store =  new Vuex.Store({
  state: {
    "appname": "PROMETHEUS",
  },
  mutations: {
    'CREATE_VAULT': function () {
      router.push('/createnewvault')
    },
    'RESTORE_VAULT': function () {
      router.push('/validatevault')
    },
    'RESET_VAULT': function () {
      router.push('/')
    }
    
  },
  actions: {
    // TODO: add api handling here
    createVault() {
      store.commit('CREATE_VAULT')
    },
    restoreVault() {
      store.commit('RESTORE_VAULT')
    },
    resetPage(){
      store.commit('RESET_VAULT')
    }
  }
})

export default store
