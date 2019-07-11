<template>
  <b-container class="p-0">
    <router-link
      class="app-title pl-2"
      :to="homeUrl"
    >
      <img src="@/assets/images/logo.svg"> {{ appName }}
    </router-link>
    <b-nav vertical class="mt-4" v-if="showNavItems">
      <b-nav-item
        v-for="item in menuItems"
        :key="item.name"
        :active="currentPage.indexOf(item.link)!==-1"
        :to="item.link"
        :disabled="item.disabled"
      >
        {{item.name}}
      </b-nav-item>
    </b-nav>
  </b-container>
</template>

<script>
export default {
  name: 'SideBar',
  props: {
    appName: {
      type: String,
      default: '',
    },
  },
  computed: {
    showNavItems() {
      return this.$route.meta.requiresAuth;
    },
  },
  data() {
    return {
      menuItems: [
        { name: 'DIDs', link: '/vault/dids' },
        { name: 'CLAIMS', link: '/vault/claims' }, // TBD
        { name: 'WALLETS (soon!)', link: '/vault/wallets', disabled: true }, // TBD
        { name: 'DEVICES (soon!)', link: '/vault/devices', disabled: true }, // TBD
      ],
      currentPage: '',
      homeUrl: '',
    };
  },
  watch: {
    // if the route hash is changed, we updates the logo's URL and
    // the current page to be able to decide in the menu, where are we.
    $route() {
      this.currentPage = window.location.pathname;
      this.homeUrl = this.$route.meta.homeUrl;
    },
  },
  beforeMount() {
    this.currentPage = window.location.pathname;
    this.homeUrl = this.$route.meta.homeUrl;
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/style/sidebar.scss';
</style>
