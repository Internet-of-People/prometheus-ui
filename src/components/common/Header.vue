<template>
  <div class="header-inner-wrapper">
    <div class="page-title sans-serif-normal float-left regular-fontsize">{{this.$store.state.appname}}
        <div class="display-inline-flex" v-if="name && name.length">{{'> '+ name}}</div>
    </div>
    <div class="primary-btn sans-serif-normal float-right regular-fontsize">
        <i class="fa fa-power-off" title="Logout"></i>Logout
    </div>
  </div>
</template>

<script>
// @usage <Header name=""/>
// name: String
export default {
  name: 'Header',
  props: ['name']
}
</script>

<style scoped>
</style>
