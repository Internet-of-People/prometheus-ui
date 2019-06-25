<template>
  <div id="app">
    <SideBar
      v-if="showSideBar"
      :app-name="appName"
    />
    <div
      id="mainContent"
      :class="{shiftMainContent: showSideBar}"
    >
      <BreadCrumb v-if="showSideBar" />
      <router-view :app-name="appName" />
    </div>
    <Footer :app-name="appName" />
  </div>
</template>

<script>
import Footer from '@/components/common/Footer';
import SideBar from '@/components/common/SideBar';
import BreadCrumb from '@/components/common/BreadCrumb';
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    Footer, 
    SideBar,
    BreadCrumb,
  },
  computed: {
    ...mapGetters([
      'appName'
    ]),
    showSideBar: function () {
      return this.$route.name !== 'intro';
    }
  }
};
</script>

<style>
@import './assets/css/stylesheets/app.css';
</style>
