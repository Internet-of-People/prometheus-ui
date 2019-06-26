<template>
  <b-container fluid class="vertical-fill">
    <b-row class="vertical-fill">
      <b-col cols="2" v-if="showSideBar" class="m-0 p-0 pt-2">
        <SideBar :app-name="appName" />
      </b-col>
      <b-col v-bind:cols="showSideBar?10:12" class="p-0 m-0">
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
import SideBar from '@/components/SideBar.vue';
import BreadCrumb from '@/components/BreadCrumb.vue';

export default {
  name: 'App',
  components: {
    Footer,
    SideBar,
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
