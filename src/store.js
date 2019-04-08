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
      {id: 1, type: "age", summary: "I am over 18.", date: "1990-01-01", claim: "birth-before"},
      {id: 2, type: "age", summary: "I am over 21.", date: "1987-01-01", claim: "birth-before"},
      {id: 3, type: "age", summary: "I am over 28.", date: "1980-01-01", claim: "birth-before"},
      {id: 4, type: "nationality", summary: "I am Hungarian.", nationality: "Hungarian"},
      {id: 5, type: "nationality", summary: "I am Szekler.", nationality: "Szekler"},
      {id: 6, type: "property", summary: "I am 190cm tall.", height: "190cm"},
      {id: 7, type: "property", summary: "I have brown hair.", hair_color: "brown"},
      {id: 8, type: "property", summary: "I can fly.", able_to: "fly"},
      {id: 9, type: "property", summary: "I can break my arms.", able_to: "break_arms"},
      {id: 10, type: "like", summary: "I like dogs.", like: "dog"},
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
