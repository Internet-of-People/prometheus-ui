<template>
  <div>
    Accounts
    <ul>
      <li v-bind:key="i.site" v-for="i in this.$store.state.accounts">
        {{ i.site }} - {{ i.handle }}
      </li>
    </ul>
    <button v-on:click="console.log('hi')">Add</button>
  </div>
</template>

<script>
export default {
  name: 'AccountsPage'
}
</script>

<style scoped>

</style>