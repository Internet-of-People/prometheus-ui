<template>
  <b-container>
    <b-row v-if="isIntroPage" class="mt-3">
      <b-col>
        <b-row class="content-container">
          <b-col class="content">
            <Loader :loading="appIsInitializing">
              <router-view :app-name="appName" v-if="!appIsInitializing" :key="$route.fullPath" />
            </Loader>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row v-else>
      <DidCreatedModal />
      <SignMessageModal />
      <b-col cols="12">
        <Header :app-name="appName" />
        <b-row class="content-container">
          <b-col lg="3" class="sidebar d-sm-none d-md-none d-lg-block" v-if="needsSideBar">
            <SideBar v-if="!appIsInitializing" />
          </b-col>
          <b-col sm="12" md="12" :lg="needsSideBar?9:12" class="content">
            <router-view :app-name="appName" v-if="!appIsInitializing" :key="$route.fullPath" />
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row align-v="end">
      <b-col><Footer :app-name="appName" /></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex';
import {
  DidCreatedModal,
  Footer,
  Header,
  Loader,
  SideBar,
  SignMessageModal,
} from '@/components';

export default {
  name: 'App',
  components: {
    DidCreatedModal,
    Footer,
    Header,
    Loader,
    SideBar,
    SignMessageModal,
  },
  computed: {
    ...mapGetters(['appIsInitializing', 'appName']),
    isIntroPage() {
      return this.$route.name === 'intro';
    },
    needsSideBar() {
      return this.$route.meta.requiresAuth && this.$route.name !== 'vaultCreated';
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/style/_variables.scss';
@import '~bootstrap/scss/bootstrap.scss';
@import '~bootstrap-vue/src/index.scss';
@import '@/assets/style/app.scss';
</style>
