<template>
  <div id="app">
    <SideBar/>
    <div id="mainContent" class="shift-main-content">
      <!-- <Header/> -->
      <router-view/>
    </div>
    <Footer/>
  </div>
</template>

<script>
// import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import SideBar from '@/components/common/SideBar'
export default {
  name: 'app',
  components: {
    // Header,
    Footer,
    SideBar
  }
}
</script>

<style>
@import './assets/css/stylesheets/app.css'
</style>
