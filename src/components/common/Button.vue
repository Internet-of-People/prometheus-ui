<template>
  <div>
    <button @click='onClick()'>{{name}}</button>
  </div>
</template>

<script>
// @usage
// Sample: <Button name="Register" v-bind:onClick="sampleFunction" />
// name: String
// onClick: Function
export default {
  name: 'Button',
  props: {
    name: String,
    onClick: Function
  }
}
</script>

<style scoped>
button{
  min-width: 90px;
  padding: 8px 16px;
  background-color: #e22e71;
  color: white;
  outline: none;
  height: 46px;
  border-radius: 0px;
  box-shadow: 0 0 20px 0 rgba(0,0,0,0.3);
  width: 140px;
}

</style>
