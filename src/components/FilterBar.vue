<template>
    <div>
        <input type="text" v-bind:value="value"
            v-on:input="$emit('input', $event.target.value)"
            placeholder="Type here to filter your IDs" />
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
@import '@/assets/style/dids.scss';
</style>
