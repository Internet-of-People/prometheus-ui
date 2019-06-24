<template>
  <div id="app">
    <SideBar :appName="appName" v-if="showSideBar" />
    <div id="mainContent" :class="{shiftMainContent: showSideBar}">
      <BreadCrumb v-if="showSideBar" />
      <router-view :appName="appName" />
    </div>
    <Footer :appName="appName" />
  </div>
</template>

<script>
import Footer from '@/components/common/Footer';
import SideBar from '@/components/common/SideBar';
import BreadCrumb from '@/components/common/BreadCrumb';
import { mapGetters } from 'vuex';

export default {
  name: 'app',
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
