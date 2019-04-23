<template>
  <div @click="redirectToProfile(cardDetails.name)" class="card">
    <ProfileType :icon="cardDetails.icon"/>
    <div class="container">
      <div><b>{{cardDetails.name}}</b></div>
      <br/>
      <div class="key-count"><i class="fas fa-key"/> count: {{cardDetails.keyCount}}</div>
      <div>{{cardDetails.desc}}</div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
const ProfileType = Vue.component('profile-type', {
  props: ['icon'],
  template: `
    <div class="primary-btn sans-serif-normal regular-fontsize">
        <i :class="icon" :title="icon" ></i>
    </div>
  `
});
export default {
  name: 'ProfileCard',
  props: ['cardDetails'],
  components: {
    ProfileType
  },
  methods: {
    redirectToProfile: function (cardname){
      if (cardname === 'Dealer Lady')
        this.$router.push('/profile/influencer')
      else if (cardname === 'Studious Sameul')
        this.$router.push('/profile/student')
      else 
        this.$router.push('/profile/'+cardname)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.card{
  height: 140px;
}

img {
  border-radius: 5px 5px 0 0;
}

.container {
  padding: 2px 16px;
}

</style>