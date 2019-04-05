<template>
  <div>
    <Header/>
    <div class="container">
        <h1>Claims</h1>
        <hr>
        <h2>Search.</h2>
        <hr>
        <h3>Filter.</h3>
        <hr>
        <h4>List</h4>
        <hr>
    </div>
  </div>
</template>

<script>
import Header from '@/components/common/Header'
//import Button from '@/components/common/Button'
export default {
  name: 'ClaimsPage',
  components: {
    Header,
//    Button,
  }
}
</script>

<style scoped>
</style>
