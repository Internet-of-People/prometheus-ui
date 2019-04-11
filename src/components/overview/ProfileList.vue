<template>
  <div>
    <div v-for="(keyvault, index1) in keyVaults" v-bind:key="index1">
      <div class="keyvault-title cursor-default" :title="fetchTitle(fetchKey(keyvault))">{{fetchKey(keyvault)}}</div>
      <div class="display-inline-flex">
        <div v-for="(row, index2) in keyvault[fetchKey(keyvault)]" v-bind:key="index2">
          <ProfileCard :card-details="row"/>
        </div>
      </div>
    </div>
    <!-- <ProfileCharts/> -->
  </div>
</template>

<script>
import ProfileCard from '@/components/overview/ProfileCard'
// import ProfileCharts from '@/components/overview/ProfileCharts'

var keyVaults= [
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
  {"Profile": [
    {
      "type": "profile",
      "name": "Oliver Fanning",
      "icon": "fab fa-instagram",
      "desc": "Personal device",
      "keyCount": 4
    },
    {
      "type": "profile",
      "name": "Larry Houdini",
      "icon": "fas fa-hat-wizard",
      "desc": "Personal device",
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
      "desc": "Personal device",
      "keyCount": 4
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
        "desc": "Personal device",
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
export default {
  name: 'Overview',
  components: {
    ProfileCard,
    // ProfileCharts,
  },
  data() {
    return {
      keyVaults: keyVaults
    }
  },
  methods:{
    fetchKey: function (obj) {
     return Object.keys(obj)[0]
    },
    fetchTitle: function (key) {
      if (key == 'Devices') {
        return "Devices that claim verifiably that they are connected to the profiles"
      } else if (key == 'Profile') {
        return "Profiles represent a behaviour "
      } else if (key == 'Groups') {
        return "Group is a group of profiles that have a representative"
      } else if (key == 'Wallets') {
        return "Wallets are specific profiles with a BIP44 or another pattern"
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
</style>
