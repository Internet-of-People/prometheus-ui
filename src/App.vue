<template>
  <b-container fluid class="vertical-fill">
    <b-row class="vertical-fill">
      <b-col cols="2" v-if="showSideBar" class="p-0 pt-2 m-0">
        <SideBar :app-name="appName" />
      </b-col>
      <b-col v-bind:cols="showSideBar?10:12" class="m-0 p-0">
        <TopBar v-if="showSideBar" />
        <Content>
          <Loader :loading="appLoading" />
          <router-view v-if="!appLoading" :app-name="appName" />
        </Content>
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
import TopBar from '@/components/TopBar.vue';
import Loader from '@/components/Loader.vue';
import Content from '@/components/Content.vue';

export default {
  name: 'App',
  components: {
    Footer,
    SideBar,
    TopBar,
    Loader,
    Content,
  },
  computed: {
    ...mapGetters([
      'appName',
      'appLoading',
    ]),
    showSideBar() {
      return this.$route.name !== 'intro';
    },
  },
  beforeCreate() {
    this.$store.dispatch('authenticate').then(() => {
      if (!this.$route.meta.requiresAuth) {
        this.$router.push('/vault/dids');
        return;
      }
      this.$store.dispatch('listDIDs').then(() => {
        this.$store.commit('APP_LOADING', false);
      });
    }).catch(() => {
      this.$store.commit('APP_LOADING', false);
      if (this.$route.meta.requiresAuth) {
        this.$router.push('/');
      }
    });
  },
};
</script>

<style lang="scss">
@import 'assets/style/app.scss';
@import '~bootstrap/scss/bootstrap.scss';
@import '~bootstrap-vue/src/index.scss';
</style>
