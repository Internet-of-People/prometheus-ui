import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store =  new Vuex.Store({
  state: {
    "appname": "Prometheus",
    "layoutActions": {
      "expandSideBar": false
    },
    "accounts": [
      {"site": "twitter", "handle": "lez"},
      {"site": "facebook", "handle": "lezlancs"},
      {"site": "hackernews", "handle": "lezhn"}
    ]
  },
  mutations: {
    'SAVE_ACCOUNT': function (state, param) {
      state.accounts.push(param)
    },
    setSideBarHover (state, newValue) {
      state.layoutActions.expandSideBar = newValue
    }
  },
  actions: {
    saveAccount (param) {
      store.commit('SAVE_ACCOUNT', param)
    }
  }
})

export default store
