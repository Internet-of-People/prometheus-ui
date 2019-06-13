<template>
  <div class='adjust-btn-frame'>
    <button :class="type" @click='onClick()'>{{name}}</button>
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
    onClick: Function,
    type: String
  }
}
</script>

<style scoped>
</style>
