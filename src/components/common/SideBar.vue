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
        <li class=""><i class="fa fa-users"/><a href="#/">Profile Overview</a></li>
        <li class=""><i class="fa fa-user"/><a href="#/profile">Profile</a></li>
        <li class=""><i class="fa fa-address-book"/><a href="#/">Address Book</a></li>
        <li class=""><i class="fa fa-list"/><a href="#/claims">Claims Overview</a></li>
        <li class=""><i class="fa fa-comment"/><a href="#/">Chat</a></li>
        <li class=""><i class="fa fa-cogs"/><a href="#/">Preferences</a></li>
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
