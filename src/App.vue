<template>
  <b-container fluid>
    <b-row>
      <b-col cols="2" v-if="showSideBar">sidebar</b-col>
      <b-col v-bind:cols="showSideBar?10:12">
        <BreadCrumb v-if="showSideBar" />
        <router-view :app-name="appName" />
      </b-col>
    </b-row>
    <b-row align-v="end">
      <b-col><Footer :app-name="appName" /></b-col>
    </b-row>
  </b-container>
</template>

<script>
import Footer from '@/components/Footer';
import SideBar from '@/components/SideBar';
import BreadCrumb from '@/components/BreadCrumb';
import { mapGetters } from 'vuex';

//import './assets/css/stylesheets/app.scss';

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
</style>
