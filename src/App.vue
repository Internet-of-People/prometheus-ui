<template>
  <div id="app">
    <!-- <SideBar/> -->
    <div id="mainContent">
      <BreadCrumb/>
      <router-view/>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Footer from '@/components/common/Footer'
// import SideBar from '@/components/common/SideBar'
import BreadCrumb from '@/components/common/BreadCrumb'

export default {
  name: 'app',
  components: {
    Footer,
    // SideBar,
    BreadCrumb
  }
}
</script>

<style>
@import './assets/css/stylesheets/app.css'
</style>
