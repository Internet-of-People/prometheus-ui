<template>
  <div>
      <input
        type="text"
        :value="value"
        v-on:input="$emit('input', $event.target.value)"
        placeholder="Type here to filter your DIDs"
      />
  </div>
</template>

<script>
export default {
  name: 'FilterBar',
  props: {
    value: String,
  },
};
</script>

<style scoped lang="scss">
@import './FilterBar.scss';
</style>
