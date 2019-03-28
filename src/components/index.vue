<template>
  <div>
    <Header name="Account details"/>
    <Button name="Register" v-bind:onClick="sampleFunction" />
  </div>
</template>

<script>
import Header from '@/components/common/Header'
import Button from '@/components/common/Button'
export default {
  name: 'MainPage',
  components: {
    Header,
    Button
  },
  methods: {
    sampleFunction(){
      var a = 20
      alert(a)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
