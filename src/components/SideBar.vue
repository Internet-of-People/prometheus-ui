<template>
  <b-container id="sidebar" class="p-0">
    <div class="justify-content-center text-center">
      <router-link :to="homeUrl">
        <b-img :src="require('@/assets/images/logo.svg')" alt="Prometheus logo" />
        <span class="d-none d-lg-inline">{{ appName }}</span>
      </router-link>
    </div>
    <b-nav vertical class="mt-4" v-if="showNavItems">
      <b-nav-item
        v-for="item in menuItems"
        :key="item.name"
        :active="currentPage === item.link.name"
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
        { name: 'DIDs', link: { name: 'listDIDs' } },
        { name: 'CLAIMS', link: { name: 'listClaims' } },
        { name: 'WALLETS (soon!)', link: '/vault/wallets', disabled: true }, // TBD
        { name: 'DEVICES (soon!)', link: '/vault/devices', disabled: true }, // TBD
        { name: 'ABOUT', link: { name: 'about' } },
      ],
      currentPage: '',
      homeUrl: '',
    };
  },
  watch: {
    // if the route hash is changed, we updates the logo's URL and
    // the current page to be able to decide in the menu, where are we.
    $route() {
      this.currentPage = this.$route.name;
      this.homeUrl = this.$route.meta.homeUrl;
    },
  },
  beforeMount() {
    this.currentPage = this.$route.name;
    this.homeUrl = this.$route.meta.homeUrl;
  },
};
</script>

<style scoped lang="scss">
@import './SideBar.scss';
</style>
