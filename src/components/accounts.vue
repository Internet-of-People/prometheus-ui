<template>
  <div>
    <Header name="Account details"/>
    <ul>
      <li v-bind:key="i.site" v-for="i in this.$store.state.accounts">
        {{ i.site }} - {{ i.handle }}
      </li>
    </ul>
    <button v-on:click="add">Add</button>
    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
export default {
  name: 'AccountsPage',
  components: {
    Header,
    Footer,
  },
  methods: {
    add(){
      alert('Adding account.');
    }
  },
}
</script>

<style scoped>

</style>