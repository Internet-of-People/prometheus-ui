<template>
  <div id="app">
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import Footer from '@/components/common/Footer'
export default {
  name: 'app',
  components: {
    Footer 
  }
}
</script>

<style>
@import './assets/css/stylesheets/app.css'
</style>
