<template>
    <div class="card">
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 200px;
  height: 140px;
  border-radius: 5px;
  margin: 0 32px 12px;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

img {
  border-radius: 5px 5px 0 0;
}

.container {
  padding: 2px 16px;
}

</style>