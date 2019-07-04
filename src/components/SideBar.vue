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
        :active="currentPage === item.link">
        <router-link :to="item.link">
          {{item.name}}
        </router-link>
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
        { name: 'WALLETS', link: '/vault/wallets' }, // TBD
        { name: 'DEVICES', link: '/vault/devices' }, // TBD
      ],
      currentPage: '',
      homeUrl: '',
    };
  },
  watch: {
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
@import '@/assets/style/app.scss';
img {
  width: 3rem;
}
</style>
