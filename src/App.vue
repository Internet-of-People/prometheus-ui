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
import { mapGetters } from 'vuex';
import Footer from '@/components/Footer.vue';
// import SideBar from '@/components/SideBar.vue';
import BreadCrumb from '@/components/BreadCrumb.vue';

export default {
  name: 'App',
  components: {
    Footer,
    // SideBar,
    BreadCrumb,
  },
  computed: {
    ...mapGetters([
      'appName',
    ]),
    showSideBar() {
      return this.$route.name !== 'intro';
    },
  },
};
</script>

<style lang="scss">
@import 'assets/style/app.scss';
@import '~bootstrap/scss/bootstrap.scss';
@import '~bootstrap-vue/src/index.scss';
</style>
