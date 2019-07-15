<template>
  <b-form-group
    :label="`${data.name}:`"
    :label-for="data.name"
    :description="data.properties.description"
  >
    <b-form-input
      :id="data.name"
      :name="data.name"
      type="number"
      size="sm"
      v-model="value"
      @input="handleInput"
    />
  </b-form-group>
</template>

<script>
export default {
  props: {
    data: {
      name: {
        type: String,
        required: true,
      },
      properties: {
        type: Object,
        required: true,
      },
    },
  },
  data() {
    return {
      value: null,
    };
  },
  methods: {
    handleInput() {
      this.$emit('input', parseInt(this.value, 10));
    },
  },
};
</script>
