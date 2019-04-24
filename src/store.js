import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store =  new Vuex.Store({
  state: {
    "appname": "Prometheus",
    "claims": [
      // mandatory fields: id, type, summary, date, claimer
      {id: 1, type: "age", summary: "I am over 18.", claimer: "Me", date: "25 May 2018", birth_date: "1990-01-01", claim: "birth-before"},
      {id: 2, type: "age", summary: "I am over 21.", claimer: "My mother", date: "25 May 2018", birth_date: "1987-01-01", claim: "birth-before"},
      {id: 3, type: "age", summary: "I am over 28.", claimer: "Snowden", date: "25 May 2018", birth_date: "1980-01-01", claim: "birth-before"},
      {id: 4, type: "nationality", summary: "I am Hungarian.", claimer: "Me", date: "25 May 2018", nationality: "Hungarian"},
      {id: 5, type: "nationality", summary: "I am Szekler.", claimer: "Whoisthis", date: "25 May 2018", nationality: "Szekler"},
      {id: 6, type: "property", summary: "I am 190cm tall.", claimer: "Dödi", date: "25 May 2018", height: "190cm"},
      {id: 7, type: "property", summary: "I have brown hair.", claimer: "Kamilla", date: "25 May 2018", hair_color: "brown"},
      {id: 8, type: "property", summary: "I can fly.", claimer: "Joe", date: "25 May 2018", able_to: "fly"},
      {id: 9, type: "property", summary: "I can break my arms.", claimer: "Me", date: "25 May 2018", able_to: "break_arms"},
      {id: 10, type: "like", summary: "I like dogs.", claimer: "Bob", date: "25 May 2018", likee: "dog"},
      {id: 11, type: "Educational", summary: "Graduate", claimer: "Nauyarit University", date: "25 May 2018", passingYear: "2018", claim: "graduate"},
      {id: 12, type: "Educational", summary: "4.0 GPA",claimer: "Nauyarit University", date: "12 Jan 2018", passingYear: "2018", claim: "percentage"}
     ],
     "keyVaults": [
      {"Devices": [
        {
          "type": "device",
          "name": "Ipad",
          "icon": "fa fa-tablet-alt",
          "desc": "Personal device",
          "keyCount": 4
        },
        {
        "type": "device",
        "name": "Bartmoss's Laptop",
        "icon": "fas fa-laptop-code",
        "desc": "Personal device",
        "keyCount": 4
        },
        {
        "type": "device",
        "name": "Smart Blenders",
        "icon": "fas fa-blender-phone",
        "desc": "Personal device",
        "keyCount": 4
        },
        {
        "type": "device",
        "name": "Snow Armoury",
        "icon": "fas fa-snowplow",
        "desc": "Personal device",
        "keyCount": 4
        }]
      },
      {"Profiles": [
        {
          "type": "profile",
          "name": "Studious Sameul",
          "icon": "fas fa-user-graduate",
          "desc": "Graduate student",
          "keyCount": 2
        },
        {
          "type": "profile",
          "name": "Oliver Fanning",
          "icon": "fab fa-instagram",
          "desc": "Influencer",
          "keyCount": 4
        },
        {
          "type": "profile",
          "name": "Larry Houdini",
          "icon": "fas fa-hat-wizard",
          "desc": "Magician",
          "keyCount": 4
        },
        {
          "type": "profile",
          "name": "Dealer Lady",
          "icon": "fas fa-bong",
          "desc": "Personal device",
          "keyCount": 4
        },
        {
          "type": "profile",
          "name": "Tutor Ontheside",
          "icon": "fas fa-chalkboard-teacher",
          "desc": "Freelance tutor available for hire",
          "keyCount": 1
        },
        {
          "type": "profile",
          "name": "Silon Musk",
          "icon": "fas fa-user-astronaut",
          "desc": "Personal device",
          "keyCount": 4
        },
        {
          "type": "profile",
          "name": "CouchSurfer Dude",
          "icon": "fas fa-hot-tub",
          "desc": "Personal device",
          "keyCount": 4
        }]
      },
      {
        "Groups":[
          {
            "type": "group",
            "name": "Gardening Club",
            "icon": "fas fa-seedling",
            "desc": "HomeOwner encouraging planting",
            "keyCount": 4
          },
          {
            "type": "group",
            "name": "University of Nayarit",
            "icon": "fas fa-university",
            "desc": "Mexican University",
            "keyCount": 4
          },
          {
            "type": "group",
            "name": "Aviato Org",
            "icon": "fab fa-aviato",
            "desc": "Personal device",
            "keyCount": 4
          },
          {
            "type": "group",
            "name": "PTA at Charlie's School",
            "icon": "fas fa-university",
            "desc": "Personal device",
            "keyCount": 4
          },
          {
            "type": "group",
            "name": "Game Nighters",
            "icon": "fas fa-chess",
            "desc": "Personal device",
            "keyCount": 4
          },
          {
            "type": "group",
            "name": "PTA",
            "icon": "fas fa-university",
            "desc": "Personal device",
            "keyCount": 4
          }]
      },
      {"Wallets":[
        {
          "name": "Bitcoin Cold Store",
          "type": "wallet",
          "icon": "fab fa-bitcoin",
          "desc": "Personal device",
          "keyCount": 4
        },
        {
          "name": "Daily Expenses Wallet",
          "type": "wallet",
          "icon": "fas fa-money-check",
          "desc": "Personal device",
          "keyCount": 4
        },
        {
          "name": "College Savings",
          "type": "wallet",
          "icon": "fas fa-piggy-bank",
          "desc": "Personal device",
          "keyCount": 4
        },
        {
          "name": "Holiday Savings",
          "type": "wallet",
          "icon": "fas fa-glass-cheers",
          "desc": "Personal device",
          "keyCount": 4
        }]
      }
    ]
  },
  mutations: {
    'SAVE_KEYVAULT': function (state, param) {
      var types = {
        device: 'Devices',
        profile: 'Profiles',
        wallet: 'Wallets',
        groups: 'Groups'
      }
      for( var row in state.keyVaults) {
        if (Object.keys(state.keyVaults[row])[0] == types[param.type]) {
          state.keyVaults[row][types[param.type]].push(param)
          break
        }
      }
    }
  },
  actions: {
    saveKeyVault (state, param) {
      store.commit('SAVE_KEYVAULT', param)
    }
  }
})

export default store
