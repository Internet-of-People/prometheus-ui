<template>
    <b-row>
      <b-col cols="8">
        <h3 class="mb-3 text-primary">Create New Claim</h3>
        <hr>
        <Tooltip id="create-claim-tooltip">
          Claims are statements about yourself, ranging from simple things like
          "I have brown eyes!" to a full digital representation of your passport.
          Claims are always associated with only one of your IDs, so your personas stay separate.
          All your claims are private by default and securely stored on your device until you
          decide to share them with other people.
        </Tooltip>
        <b-form @submit.stop.prevent="onSubmit">
          <b-card>
            <b-form-group
              label="Schema:"
              label-for="schema"
              description="In many cases, a widely used template already
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
            <template v-for="item in schemaPropertiesCollection">
              <component
                :key="item.key"
                :is="getSchemaComponent(item.properties.type)"
                v-bind="{ data: {
                  name: item.key,
                  properties: item.properties,
                } }"
                v-model="claimContent[item.key]"
              />
            </template>
          </b-card>
          <b-card class="mt-3">
            <b-alert show>Automatic Witness Requests coming soon!</b-alert>
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
                v-model="witnesses"
                v-validate="{ required: true }"
                :state="validateState('witnesses')"
                aria-describedby="witnesses-live-feedback"
                disabled
              />
              <b-form-invalid-feedback id="witnesses-live-feedback">
                You have to add at least one witness's DID.
              </b-form-invalid-feedback>
            </b-form-group>
          </b-card>
          <hr>
          <b-button
            @click="$router.go(-1)"
            variant="light"
            class="mr-4 text-uppercase"
          >
            <fa icon="angle-left" /> Back
          </b-button>
          <b-button @click="create" variant="primary" class="text-uppercase">
            Create
          </b-button>
        </b-form>
        <b-modal
          id="modal-claim-created"
          title="Your Claim has been Created!"
          no-close-on-esc
          hide-footer
        >
          <b-alert show variant="success">
            In the future, Prometheus will be able to automatically request signatures for your
            claims from your contacts and/or service providers. Until then, you can manually
            gather signatures for your claims by asking your peers to sign this message:
          </b-alert>

          <b-input-group class="mt-3">
            <b-form-input :value="claimMessageToSign" disabled></b-form-input>
            <b-input-group-append>
              <b-button
                variant="outline-primary"
                v-clipboard:copy="claimMessageToSign"
                v-clipboard:success="onCopyMessage"
                class="text-uppercase"
                :disabled="saving"
              >
                Copy &amp; Close
                <b-spinner small class="ml-1" v-if="saving" />
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-modal>
      </b-col>
    </b-row>
</template>

<script>
import { mapGetters } from 'vuex';
import api from '@/api';
import {
  NumberField, Tooltip, StringField,
} from '@/components';

export default {
  components: {
    NumberField,
    StringField,
    Tooltip,
  },
  data() {
    return {
      schema: null,
      saving: false,
      claimContent: {},
      witnesses: '',
      createdClaimId: '',
      claimMessageToSign: '',
    };
  },
  computed: {
    ...mapGetters(['claimSchemas', 'dids', 'activeDid']),
    availableSchemas() {
      return this.claimSchemas.map(schema => ({ value: schema.id, text: schema.label }));
    },
    availableDids() {
      return this.dids.map(did => ({ value: did.id, text: did.label }));
    },
    schemaPropertiesCollection() {
      if (!this.schema) {
        return undefined;
      }
      const [schema] = this.claimSchemas.filter(s => s.id === this.schema);
      const mappingFn = i => ({ key: i, properties: schema.content.properties[i] });
      let schemaProperties = Object.keys(schema.content.properties).map(mappingFn);

      schemaProperties = schemaProperties.sort((a, b) => {
        if (
          schema.ordering.indexOf(a.key) === -1
          && schema.ordering.indexOf(b.key) === -1
        ) {
          return 0;
        }

        if (schema.ordering.indexOf(a.key) > schema.ordering.indexOf(b.key)) {
          return 1;
        }

        return -1;
      });
      return schemaProperties;
    },
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
    async onCopyMessage() {
      this.$router.push({ name: 'viewDID', params: { did: this.activeDid.id } });
    },
    async create() {
      if (!await this.$validator.validateAll()) {
        return;
      }

      this.saving = true;
      this.createdClaimId = await this.$store.dispatch('createClaim', {
        schema: this.schema,
        content: this.claimContent,
      });
      this.saving = false;
      const { data } = await api.getClaimWitnessMessage(this.activeDid.id, this.createdClaimId);
      this.claimMessageToSign = data;
      this.$bvModal.show('modal-claim-created');
    },
  },
};
</script>
