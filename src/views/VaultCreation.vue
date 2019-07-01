<template>
  <Content>
    <b-alert show variant="success">
      <h4 class="alert-heading">Your Vault has been created!</h4>
      <p>
        Now that we have our vault in place, we can begin creating profiles or as we call IDs.
        Each ID has an encrypted key. IDs have claims associated like Application Usage,
        charting and Performance measurements.<br>
        More on that later, let's begin with creating your initial ID.
      </p>
    </b-alert>

    <b-button variant="primary" to="/">
      GO TO IDs
      <fa icon="angle-right" />
    </b-button>
  </Content>
</template>

<script>
import Content from '@/components/Content.vue';

export default {
  components: {
    Content,
  },
  name: 'VaultCreation',
  methods: {
    createID() {
      // TODO: add createID logic
      // console.log('create new id');
    },
  },
};
</script>
