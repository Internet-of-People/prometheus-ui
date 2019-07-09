<template>
    <b-row>
      <b-col cols="6">
        <Tooltip>
          Claims are statements about yourself, ranging from simple things like
          "I have blue eyes!" to a full digital representation of your passport.
          Claims are always associated with only one of your IDs, so your personas stay separate.
          All your claims are private by default and securely stored on your device until you
          decide to share them with other people.
        </Tooltip>
        <b-form @submit.stop.prevent="onSubmit">
          <b-form-group
            label="Applies to:"
            label-for="subjectDid"
            description="The DID this claim should apply to."
          >
            <b-form-select
              id="subjectDid"
              name="subjectDid"
              :options="form.dids ? form.dids : []"
              v-model="form.dids"
              v-validate="{ required: true }"
              :state="validateState('subjectDid')"
            />
          </b-form-group>
          <hr>
          <b-form-group
            label="Schema:"
            label-for="schema"
            description="The claim schema. In many cases, a widely used template already
            exists for the claim you want to make. If you don't find anything applicable,
            you can create your own schema or modify an existing one."
          >
            <b-form-select
              id="schema"
              name="schema"
              :options="form.schemas ? form.schemas : []"
              v-model="form.schemas"
              v-validate="{ required: true }"
              :state="validateState('schema')"
            />
          </b-form-group>
          <hr>
          <b-form-group
            label="Witnesses:"
            label-for="witnesses"
            description="In many cases, other people will not rely on your word alone and
            you need to present witnesses for your statement. Select one or more witnesses
            from your contacts or dedicated service providers."
          >
            <b-form-input
              id="witnesses"
              name="witnesses"
              v-model="form.witnesses"
              v-validate="{ required: true }"
              :state="validateState('witnesses')"
              aria-describedby="witnesses-live-feedback"
            />
            <b-form-invalid-feedback id="witnesses-live-feedback">
              You have to add at least one witness's DID.
            </b-form-invalid-feedback>
          </b-form-group>
          <hr>
          <b-button to="/vault/claims" variant="light" class="mr-4">CANCEL</b-button>
          <b-button @click="create" variant="primary">
            CREATE &amp; SEND
            <fa icon="angle-right" />
          </b-button>
        </b-form>
      </b-col>
    </b-row>
</template>

<script>
import Tooltip from '@/components/Tooltip.vue';

export default {
  components: {
    Tooltip,
  },
  data() {
    return {
      form: {
        dids: null,
        schemas: null,
        witnesses: null,
      },
    };
  },
  methods: {
    validateState(ref) {
      if (
        this.vFields[ref]
        && (this.vFields[ref].dirty || this.vFields[ref].validated)
      ) {
        return !this.vErrors.has(ref);
      }
      return null;
    },
    create() {
      this.$validator.validateAll().then((result) => {
        if (!result) {
          return;
        }

        console.log('OK!');
      });
    },
  },
};
</script>
