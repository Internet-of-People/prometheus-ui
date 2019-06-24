<template>
  <div>
    <nav class="hovered">
      <ul>
        <a class="app-title" href="/">
          <img src="../../assets/images/logo.svg"/>
          <div>
            {{this.$store.state.appname}}
          </div>
        </a>
        <!-- <li class=""><i class="fa fa-user"/><a href="#/profile/student">Vault</a></li>
        <li class=""><i class="fa fa-address-book"/><a href="#/">ID</a></li>
        <li class=""><i class="fa fa-list"/><a href="#/claims">Claims</a></li>
        <li class=""><i class="fa fa-comment"/><a href="#/">Wallet</a></li>
        <li class=""><i class="fa fa-cogs"/><a href="#/">Contacts</a></li> -->
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'SideBar'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
</style>
