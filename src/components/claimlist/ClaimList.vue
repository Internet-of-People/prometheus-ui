<template>
  <div>
    <FilterBar v-if="claims.length" v-model="searchTerm" text="Type here to filter your claims" />
    <b-alert
      show
      variant="warning"
      v-if="!claimTableItems.length && this.searchTerm.length"
      class="mt-3"
    >
      No claims found with the term "{{ this.searchTerm }}"
    </b-alert>
    <b-table
      :items="claimTableItems"
      :fields="getTableFields()"
      class="mt-3"
      hover
      show-empty
      outlined
      sticky-header="100px"
      empty-text="No properties"
      v-if="claimTableItems.length"
    >
      <template slot="signatures" slot-scope="data">
          <b-button
            v-if="data.item.claim.proof.length===0"
            disabled
            variant="danger"
            size="sm"
            >0 signature</b-button>
          <b-button
            v-if="data.item.claim.proof.length>0"
            variant="success"
            size="sm"
            @click="onSignatureDetails(data.item.claim)"
            >
            {{ data.item.claim.proof.length }}
            <template v-if="data.item.claim.proof.length===1">signature</template>
            <template v-else>signatures</template>
          </b-button>
      </template>
      <template slot="actions" slot-scope="data">
        <b-button
          size="sm"
          variant="outline-primary mr-2"
          @click="onDetailsButtonInListClick(data.item.claim)"
        >
          Details
        </b-button>
        <b-button
          size="sm"
          variant="outline-primary mr-2"
          @click="onRequestSignatureButtonInListClick(data.item.claim)"
        >
          Request Signature
        </b-button>
        <b-button
          size="sm"
          variant="outline-primary"
          @click="onImportSignatureButtonInListClick(data.item.claim)"
        >
          Import Signature
        </b-button>
      </template>
    </b-table>
    <b-modal
      id="modal-claim-details"
      :title="claimBeingHandled.schema_name"
      no-close-on-esc
      ok-only
      ok-title="CLOSE"
    >
      <pre>{{ claimBeingHandled }}</pre>
    </b-modal>

    <b-modal
      id="modal-signature-details"
      :title="claimBeingHandled.schema_name + ' Signatures'"
      no-close-on-esc
      ok-only
      size="xl"
      ok-title="CLOSE"
    >
      <b-table
        :items="fetchSignatureRows()"
        :fields="['ID', 'Witness ID', 'Issued At', 'Expires On']"
        class="mt-3"
        hover
        show-empty
        outlined
        sticky-header="40px"
        empty-text="No properties"
      ></b-table>
    </b-modal>

    <b-modal
      id="modal-claim-request-signature"
      title="Witness Message"
      no-close-on-esc
      hide-footer
    >
      <b-alert show variant="success">
        Copy this message and send it to your desired witnesses and ask them to sign it
        using Prometheus.
      </b-alert>

      <b-input-group class="mt-3">
        <b-form-input :value="claimMessageToSign" disabled></b-form-input>
        <b-input-group-append>
          <b-button
            variant="outline-primary"
            v-clipboard:copy="claimMessageToSign"
            v-clipboard:success="onCopyClaimWitnessMessage"
            class="text-uppercase"
          >
            Copy &amp; Close
          </b-button>
        </b-input-group-append>
      </b-input-group>
    </b-modal>
    <b-modal
      id="modal-claim-import-signature"
      title="Import Claim Signature"
      no-close-on-esc
      hide-footer
    >
      <b-alert show variant="success">
        Copy &amp; paste your signature here:
      </b-alert>
      <b-form-input v-model="importSignature.signature"></b-form-input>
      <b-button
        variant="primary"
        class="mt-3"
        :disabled="importSignature.loading"
        @click="onImportClaimSignatureButtonClick"
      >
        Import
        <b-spinner small class="ml-1" v-if="importSignature.loading" />
      </b-button>
      <b-alert show v-if="importSignature.error" variant="danger" class="mt-3">
        <strong>An error occured during importing signature:</strong><br>
        {{ importSignature.error }}
      </b-alert>
    </b-modal>
  </div>
</template>

<script>
import FilterBar from '../FilterBar.vue';
import api from '@/api';
import getClaimTableItems from './ClaimTableItems';

export default {
  name: 'ClaimList',
  components: {
    FilterBar,
  },
  props: {
    claims: {
      type: Array,
      required: true,
    },
    schemas: {
      type: Array,
      required: true,
    },
    showDidLabel: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      searchTerm: '',
      claimMessageToSign: '',
      claimBeingHandled: {},
      signatureToLoad: [],
      importSignature: {
        error: '',
        loading: false,
        signature: '',
      },
    };
  },
  computed: {
    claimTableItems() {
      return getClaimTableItems(this.claims, this.schemas, this.searchTerm, this.showDidLabel);
    },
  },
  methods: {
    formatDate(timestamp) {
      const date = new Date(timestamp * 1000);
      // eslint-disable-next-line
      const iso = date.toISOString().match(/(\d{4}\-\d{2}\-\d{2})T(\d{2}:\d{2}:\d{2})/);
      return `${iso[1]} ${iso[2]}`;
    },
    async onRequestSignatureButtonInListClick(claim) {
      this.claimBeingHandled = claim;
      const { data } = await api.getClaimWitnessMessage(claim.subject_id, claim.id);
      this.claimMessageToSign = data;
      this.$bvModal.show('modal-claim-request-signature');
    },
    onImportSignatureButtonInListClick(claim) {
      this.claimBeingHandled = claim;
      this.importSignature.error = '';
      this.importSignature.signature = '';
      this.$bvModal.show('modal-claim-import-signature');
    },
    onDetailsButtonInListClick(claim) {
      this.claimBeingHandled = claim;
      this.$bvModal.show('modal-claim-details');
    },
    onSignatureDetails(claim) {
      this.claimBeingHandled = claim;
      this.signatureToLoad = claim.proof;
      this.$bvModal.show('modal-signature-details');
    },
    fetchSignatureRows() {
      const rows = this.signatureToLoad;
      return rows.map((row, index) => ({
        ID: index,
        'Witness ID': row.signer_id,
        'Issued At': this.formatDate(row.issued_at.secs_since_epoch),
        'Expires On': this.formatDate(row.valid_until.secs_since_epoch),
      }));
    },

    async onImportClaimSignatureButtonClick() {
      this.importSignature.loading = true;
      this.importSignature.error = '';

      try {
        await api.importClaimWitnessMessage(
          this.claimBeingHandled.subject_id,
          this.claimBeingHandled.id,
          this.importSignature.signature,
        );

        this.$emit('listUpdated');
        this.$bvModal.hide('modal-claim-import-signature');
      } catch (e) {
        if (e.response && e.response.data) {
          this.importSignature.error = e.response.data;
        } else {
          this.importSignature.error = e;
        }
      }

      this.importSignature.loading = false;
    },
    onCopyClaimWitnessMessage() {
      this.$bvToast.toast('The message has been copied to your clipboard!', {
        title: 'Copied!',
        variant: 'success',
        toaster: 'b-toaster-bottom-left',
        solid: true,
      });
      this.$bvModal.hide('modal-claim-request-signature');
    },
    getTableFields() {
      if (this.showDidLabel) {
        return ['name', 'value', 'did', 'signatures', 'actions'];
      }
      return ['name', 'value', 'signatures', 'actions'];
    },
  },
};
</script>
<style scoped lang="scss">
@import './ClaimList.scss';
</style>
