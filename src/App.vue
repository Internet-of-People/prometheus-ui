<template>
  <div id="app">
    <!-- only intro page is missing the sidebar -->
    <SideBar v-if="sideBarDisplay"/>
    <div id="mainContent" v-bind:class="{shiftMainContent: sideBarDisplay}">
      <BreadCrumb/>
      <router-view/>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Footer from '@/components/common/Footer'
import SideBar from '@/components/common/SideBar'
import BreadCrumb from '@/components/common/BreadCrumb'

export default {
  name: 'app',
  components: {
    Footer,
    SideBar,
    BreadCrumb
  },
  computed: {
    sideBarDisplay: function () {
      return this.$route.name !== "intro"
    }
  }
}
</script>

<style>
@import './assets/css/stylesheets/app.css'
</style>
