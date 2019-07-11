<template>
    <b-row>
      <b-col cols="8">
        <Tooltip id="createclaim-tooltip">
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
              id="did"
              name="did"
              :options="availableDids ? availableDids : []"
              v-model="did"
              v-validate="{ required: true }"
              :state="validateState('did')"
            >
              <template slot="first">
                <option :value="null" disabled selected>-- Please select a DID --</option>
              </template>
            </b-form-select>
          </b-form-group>
          <hr>
          <b-card>
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
                v-model="schema"
                :options="availableSchemas ? availableSchemas : []"
                v-validate="{ required: true }"
                :state="validateState('schema')"
              >
                <template slot="first">
                  <option :value="null" disabled selected>-- Please select a schema --</option>
                </template>
              </b-form-select>
            </b-form-group>
            <template v-for="(properties, field) in schemaProperties">
              <component
                :key="field"
                :is="getSchemaComponent(properties.type)"
                v-bind="{data:{
                  name: field,
                  properties,
                }}"
              />
            </template>
          </b-card>
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
          <b-button @click="create" variant="primary" :disabled="saving">
            CREATE &amp; SEND
            <b-spinner small class="ml-1" v-if="saving" />
          </b-button>
        </b-form>
      </b-col>
    </b-row>
</template>

<script>
import { mapGetters } from 'vuex';
import { NumberField, Tooltip, StringField } from '@/components';

export default {
  components: {
    Tooltip,
    NumberField,
    StringField,
  },
  data() {
    return {
      schema: null,
      did: null,
      saving: false,
      form: { // validation
        dids: null,
        schemas: null,
        witnesses: null,
      },
    };
  },
  computed: {
    ...mapGetters(['claimSchemas', 'dids']),
    availableSchemas() {
      return this.claimSchemas.map(schema => ({ value: schema.id, text: schema.alias }));
    },
    availableDids() {
      return this.dids.map(did => ({ value: did.id, text: did.alias }));
    },
    schemaProperties() {
      if (!this.schema) {
        return undefined;
      }
      const [schema] = this.claimSchemas.filter(s => s.id === this.schema);
      return schema.content.properties;
    },
  },
  beforeCreate() {
    this.$store.dispatch('listClaimSchemas');
  },
  methods: {
    getSchemaComponent(type) {
      switch (type) {
        case 'string':
          return StringField;
        case 'number':
          return NumberField;
        default:
          throw Error(`Unknown schema property type: ${type}`);
      }
    },
    // TODO: this is duplicated at multiple places
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

        this.saving = true;
        this.$store.dispatch('createClaim').then(() => {
          this.saving = false;
          this.$router.push('/vault/claims');
        });
      });
    },
  },
};
</script>
