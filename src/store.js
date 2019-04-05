import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store =  new Vuex.Store({
  state: {
    "appname": "Prometheus",
    "accounts": [
      {"site": "twitter", "handle": "lez"},
      {"site": "facebook", "handle": "lezlancs"},
      {"site": "hackernews", "handle": "lezhn"}
    ],
    "claims": [
      // mandatory fields: type, summary
      {type: "age", summary: "I am over 18.", date: "1990-01-01", claim: "birth-before"},
      {type: "nationality", summary: "I am Hungarian.", nationality: "Hungarian"},
      {type: "property", summary: "I am 190cm tall.", height: "190cm"},
    ],
  },
  mutations: {
    'SAVE_ACCOUNT': function (state, param) {
      state.accounts.push(param)
    }
  },
  actions: {
    saveAccount (param) {
      store.commit('SAVE_ACCOUNT', param)
    }
  }
})

export default store
