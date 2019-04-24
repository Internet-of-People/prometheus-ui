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

export default {
  name: 'Overview',
  components: {
    ProfileCard,
    // ProfileCharts,
  },
  data() {
    return {
      keyVaults: this.$store.state.keyVaults
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
