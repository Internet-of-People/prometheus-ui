import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    "accounts": [
      {"site": "twitter", "handle": "lez"},
      {"site": "facebook", "handle": "lezlancs"},
      {"site": "hackernews", "handle": "lezhn"}
    ]
  },
  mutations: {

  },
  actions: {

  }
})
