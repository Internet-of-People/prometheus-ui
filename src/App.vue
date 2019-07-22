<template>
  <b-container fluid class="vertical-fill">
    <b-row class="vertical-fill">
      <b-col cols="2" v-if="showSideBar" class="p-0 pt-2 m-0">
        <SideBar :app-name="appName" />
      </b-col>
      <b-col v-bind:cols="showSideBar?10:12" class="m-0 p-0">
        <TopBar v-if="showSideBar" />
        <Content>
          <router-view :app-name="appName" />
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
import {
  Content,
  Footer,
  SideBar,
  TopBar,
} from '@/components';

export default {
  name: 'App',
  components: {
    Footer,
    SideBar,
    TopBar,
    Content,
  },
  computed: {
    ...mapGetters(['appName']),
    showSideBar() {
      return this.$route.name !== 'intro';
    },
  },
  async beforeCreate() {
    try {
      await this.$store.dispatch('authenticate');
      await this.$store.dispatch('listDIDs');
      await this.$store.dispatch('listClaimSchemas');

      this.$router.push({ name: 'listDIDs' });
    } catch (err) {
      this.$router.push({ name: 'intro' });
    }
  },
};
</script>

<style lang="scss">
@import '@/assets/style/_variables.scss';
@import '~bootstrap/scss/bootstrap.scss';
@import '~bootstrap-vue/src/index.scss';
@import '@/assets/style/app.scss';
</style>
