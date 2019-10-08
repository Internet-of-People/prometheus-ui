<template>
  <b-modal
    id="modal-sign-message"
    title="Import Claim Signature"
    hide-footer
  >
    <b-alert show>
      Here you can attest other peoples claims.
      If you want to build a reputation as a reliable witness,
      you should only sign claims you know to be true.
    </b-alert>
    <b-form @submit.stop.prevent="onSubmit">
      <b-form-group
        label="Message:"
        label-for="sign-message"
        description="Paste here the claim message you'd like to sign"
      >
        <b-form-textarea
          id="message"
          name="message"
          v-model="message"
          rows="3"
          max-rows="6"
          v-validate="{ required: true }"
          :state="validateState('message')"
        ></b-form-textarea>
      </b-form-group>
      <b-button
        variant="primary"
        class="text-uppercase"
        block
        :disabled="signing"
        @click="onSignMessageButtonClick"
      >
        Sign
        <b-spinner small class="ml-1" v-if="signing" />
      </b-button>
      <b-alert show v-if="error" variant="danger" class="mt-3">
        <strong>An error occured during signing:</strong><br>
        {{ error }}
      </b-alert>
      <b-form-group
        label="Signature:"
        label-for="sign-signature"
        description="This is the signature you can send back"
        v-if="signature"
      >
        <b-form-textarea
          id="sign-signature"
          v-model="signature"
          rows="3"
          max-rows="6"
          disabled
        ></b-form-textarea>
      </b-form-group>
      <b-button
        variant="outline-primary"
        v-clipboard:copy="signature"
        v-clipboard:success="onCopySignatureButtonClick"
        v-if="signature"
        class="text-uppercase"
      >
        Copy &amp; Close
      </b-button>
    </b-form>
  </b-modal>
</template>
<script>
import api from '@/api';
import EventBus from '@/eventbus';

export default {
  data() {
    return {
      message: '',
      signing: false,
      signature: '',
      error: '',
    };
  },
  mounted() {
    EventBus.$on('open-sign-message-modal', () => {
      this.message = '';
      this.signing = false;
      this.signature = '';
      this.error = '';
      this.$bvModal.show('modal-sign-message');
    });
  },
  methods: {
    async onSignMessageButtonClick() {
      if (!await this.$validator.validateAll()) {
        return;
      }

      this.signing = true;
      this.error = '';
      try {
        const result = await api.signClaim(this.message);
        this.signature = result.data;
      } catch (e) {
        if (e.response && e.response.data) {
          this.error = e.response.data;
        } else {
          this.error = e;
        }
      }

      this.signing = false;
    },
    onCopySignatureButtonClick() {
      this.$bvToast.toast('The signature has been copied to your clipboard!', {
        title: 'Copied!',
        variant: 'success',
        toaster: 'b-toaster-bottom-left',
        solid: true,
      });
      this.$bvModal.hide('modal-sign-message');
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
  },
};
</script>
