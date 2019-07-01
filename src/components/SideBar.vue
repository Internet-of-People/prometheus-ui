<template>
  <b-container>
    <router-link
      class="app-title"
      to="/"
    >
      <img src="@/assets/images/logo.svg"> {{ appName }}
    </router-link>
    <b-nav vertical class="mt-4" v-if="showNavItems">
      <b-nav-item
        v-for="item in menuItems"
        :key="item.name"
        :active="activeItem === item.name">
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
    activeItem: {
      type: String,
      default: 'DIDs',
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
    };
  },
  computed: {
    showNavItems() {
      return this.$route.meta.requiresAuth;
    },
  },
};
</script>

<style scoped lang="scss">
img {
  width: 3rem;
}
.active{
  background-color: #e9ecef;
}
</style>
