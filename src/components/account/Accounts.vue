<template>
  <div>
    <ul>
      <li v-bind:key="i.site" v-for="i in this.$store.state.accounts">
        {{ i.site }} - {{ i.handle }}
      </li>
    </ul>
    <Add/>
  </div>
</template>

<script>
import Add from '@/components/account/Add'
export default {
  name: 'Accounts',
  components: {
    Add,
  },
  methods: {
  },
}
</script>

<style scoped>
</style>