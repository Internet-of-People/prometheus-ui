<template>
  <div>
    <Header name="Account details"/>
    <ul>
      <li v-bind:key="i.site" v-for="i in this.$store.state.accounts">
        {{ i.site }} - {{ i.handle }}
      </li>
    </ul>
    <Add/>
    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import Add from '@/components/account/Add'
export default {
  name: 'Accounts',
  components: {
    Header,
    Footer,
    Add,
  },
  methods: {
  },
}
</script>

<style scoped>

</style>