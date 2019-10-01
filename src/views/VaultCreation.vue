<template>
  <div>
    <b-alert show variant="success">
      <h4 class="alert-heading">Your Vault has been created!</h4>
      <p>
        Now that you have your vault in place, you can begin creating personas.
      </p>
    </b-alert>
    <b-alert show variant="info">
      <p>
        <strong>What is a persona?</strong><br>
        Personas are unique and deterministically created <strong>identifiers</strong>.
        Personas can be used for separating your <strong>different roles in life
        (personas)</strong> and their claims.
      </p>
      <p>
        <strong>What is a claim?</strong><br>
        Claims are statements attached to personas.
        For example, "my eyes are brown", or "I'm a student of Cambridge".
      </p>
      <p>
        <strong>Example</strong><br>
        <u>Persona</u>: Student Profile<br>
        <u>Claims</u>:
        <ul>
          <li>I'm a student of MIT</li>
          <li>Member of Gamma Kappa Chapter</li>
        </ul>
      </p>
    </b-alert>

    <b-button
      @click="createDID"
      class="text-uppercase"
      variant="primary"
      :disabled="loading"
    >
      Create a Persona
      <b-spinner small v-if="loading" class="ml-1" />
    </b-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async createDID() {
      this.loading = true;
      const { id } = await this.$store.dispatch('createDID');
      await Promise.all([
        this.$store.dispatch('setActiveDID', id),
        this.$store.dispatch('listDIDs'),
        this.$store.dispatch('listClaimSchemas'),
      ]);

      this.loading = false;
      this.$router.push({ name: 'viewDID', params: { did: id } });
    },
  },
};
</script>
