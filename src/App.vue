<template>
  <div id="app">
    <SideBar/>
    <div id="mainContent" class="shift-main-content">
      <router-view/>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Footer from '@/components/common/Footer'
import SideBar from '@/components/common/SideBar'
export default {
  name: 'app',
  components: {
    Footer,
    SideBar
  }
}
</script>

<style>
@import './assets/css/stylesheets/app.css'
</style>
