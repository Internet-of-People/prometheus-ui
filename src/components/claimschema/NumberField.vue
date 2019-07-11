<template>
  <b-form-group
    :label="`${data.name}:`"
    :label-for="data.name"
    :description="data.properties.description"
  >
    <b-form-input
      id="data.name"
      name="data.name"
      type="number"
      size="sm"
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
};
</script>
