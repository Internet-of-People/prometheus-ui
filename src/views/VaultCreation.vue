<template>
  <Content>
    <b-alert show variant="success">
      <h4 class="alert-heading">Your Vault has been created!</h4>
      <p>
        Now that we have our vault in place, we can begin creating profiles or as we call DIDs.
      </p>
    </b-alert>
    <b-alert show variant="info">
      <p>
        <strong>What is a DID?</strong><br>
        DIDs are unique and deterministically created identities. DIDs can be used for separating
        your identities and its claims.
      </p>
      <p>
        <strong>What is a claim?</strong><br>
        Claims are statements attached to DIDs.
        For example, "my eye is blue", or "I'm a student of Cambridge".
      </p>
      <p>
        <strong>Example</strong><br>
        <u>DID</u>: Student Profile<br>
        <u>Claims</u>:
        <ul>
          <li>I'm a student of MIT</li>
          <li>Member of Gamma Kappa Chapter</li>
        </ul>
      </p>
    </b-alert>

    <b-button variant="primary" to="/vault/dids">
      GO TO DIDs
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
};
</script>
