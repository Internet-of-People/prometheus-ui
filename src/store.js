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
      // mandatory fields: id, type, summary, date, claimer
      {id: 1, type: "age", summary: "I am over 18.", claimer: "Me", date: "25 May 2018", birth_date: "1990-01-01", claim: "birth-before"},
      {id: 2, type: "age", summary: "I am over 21.", claimer: "My mother", date: "25 May 2018", birth_date: "1987-01-01", claim: "birth-before"},
      {id: 3, type: "age", summary: "I am over 28.", claimer: "Snowden", date: "25 May 2018", birth_date: "1980-01-01", claim: "birth-before"},
      {id: 4, type: "nationality", summary: "I am Hungarian.", claimer: "Me", date: "25 May 2018", nationality: "Hungarian"},
      {id: 5, type: "nationality", summary: "I am Szekler.", claimer: "", date: "25 May 2018", nationality: "Szekler"},
      {id: 6, type: "property", summary: "I am 190cm tall.", claimer: "Dodi", date: "25 May 2018", height: "190cm"},
      {id: 7, type: "property", summary: "I have brown hair.", claimer: "Kamilla", date: "25 May 2018", hair_color: "brown"},
      {id: 8, type: "property", summary: "I can fly.", claimer: "Joe", date: "25 May 2018", able_to: "fly"},
      {id: 9, type: "property", summary: "I can break my arms.", claimer: "Me", date: "25 May 2018", able_to: "break_arms"},
      {id: 10, type: "like", summary: "I like dogs.", claimer: "Bob", date: "25 May 2018", likee: "dog"},
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
