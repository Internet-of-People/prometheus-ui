<template>
  <b-row class="d-flex justify-content-start">
    <b-col cols="6" sm="4" md="3" lg="2" v-for="(word,index) in words" :key="index">
      <b-input-group
        size="sm"
        class="mb-2"
      >
        <b-input-group-addon>
          <b-input-group-text class="justify-content-end">
            {{ index + 1 }}
          </b-input-group-text>
        </b-input-group-addon>
        <b-form-input trim :readonly="readonly" v-model="words[index]" />
      </b-input-group>
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: {
    readonly: {
      type: Boolean,
      default: false,
    },
    words: Array,
  },
};
</script>

<style scoped>
@import './MnemonicWords.scss'
</style>
