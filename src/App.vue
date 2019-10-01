<template>
  <b-container>
    <b-row :class="showHeader?'':'mt-3'">
      <b-col cols="12">
        <Header :app-name="appName" v-if="showHeader" />
        <b-row class="content" no-gutters>
          <b-col>
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
  Footer,
  Header,
} from '@/components';

export default {
  name: 'App',
  components: {
    Footer,
    Header,
  },
  computed: {
    ...mapGetters(['appIsInitializing', 'appName']),
    showHeader() {
      return this.$route.name !== 'intro';
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
