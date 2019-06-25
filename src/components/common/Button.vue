<template>
  <div class="adjust-btn-frame">
    <button
      :class="type"
      @click="onClick()"
    >
      <slot />
    </button>
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
    onClick: {
      type: Function,
      default: ()=>{}
    },
    type: {
      type: String,
      default: ''
    }
  }
};
</script>

<style scoped>
</style>
