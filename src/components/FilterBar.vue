<template>
  <div>
      <input
        type="text"
        v-on:input="$emit('input', $event.target.value)"
        :placeholder="text"
      />
  </div>
</template>

<script>
export default {
  name: 'FilterBar',
  props: {
    text: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
@import './FilterBar.scss';
</style>
