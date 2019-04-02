<template>
  <div>
      <nav @mouseover="expand = true" @mouseleave="expand = false" v-bind:class="{ 'hovered': expand}">
        <ul>
            <li class=""><i class="fa fa-users"/><a href="#">Profile Overview</a></li>
            <li class=""><i class="fa fa-user"/><a href="">Profile</a></li>
            <li class=""><i class="fa fa-address-book"/><a href="">Address Book</a></li>
            <li class=""><i class="fa fa-list"/><a href="">Claims Overview</a></li>
            <li class=""><i class="fa fa-comment"/><a href="">Chat</a></li>
            <li class=""><i class="fa fa-cogs"/><a href="">Preferences</a></li>
        </ul>
      </nav>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
  computed: {
    expand: {
      get: function () {
        return this.$store.state.layoutActions.expandSideBar
      },
      set: function (newValue) {
        this.$store.commit('setSideBarHover', newValue)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
</style>
