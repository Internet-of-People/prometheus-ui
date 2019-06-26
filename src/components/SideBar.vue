<template>
  <b-container>
    <router-link
          class="app-title"
          to="/"
        >
      <img src="@/assets/images/logo.svg">
      {{ appName }}
    </router-link>
    <b-nav vertical class="mt-4">
      <b-nav-item>asd</b-nav-item>
    </b-nav>
  </b-container>
  <!--<div>
        <li class=""><i class="fa fa-user"/><a href="#/profile/student">Vault</a></li>
        <li class=""><i class="fa fa-address-book"/><a href="#/">ID</a></li>
        <li class=""><i class="fa fa-list"/><a href="#/claims">Claims</a></li>
        <li class=""><i class="fa fa-comment"/><a href="#/">Wallet</a></li>
        <li class=""><i class="fa fa-cogs"/><a href="#/">Contacts</a></li>
  </div>-->
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
};
</script>

<style scoped lang="scss">
img {
  width: 3rem;
}
</style>
