<template>
  <div class="pt-2 pb-2">
    <b-row no-gutters v-if="showProfile" class="mb-2 header-with-profile">
      <b-col cols="3" class="active-did">
        <template v-if="activeDid">
          <b-dropdown variant="primary" class="scrollable-menu">
            <template v-slot:button-content>
              <b-img :src="activeDid.avatar" alt="avatar image" class="avatar" />
              <div class="did-label">{{ activeDid.label }}</div>
            </template>
            <b-dropdown-item
              v-for="did in dids"
              :key="did.id"
              :class="did.id===activeDid.id?'d-none':''"
              @click="onDidSelected(did.id)"
            >
              <b-img :src="did.avatar" alt="avatar image" class="avatar" />
              {{ did.label }}
            </b-dropdown-item>
            <b-dropdown-divider />
            <b-dropdown-item @click="onCreateDid">
              <fa icon="address-card" />
              Create New Persona
            </b-dropdown-item>
            <b-dropdown-divider />
            <b-dropdown-item @click="onSignMessageMenuButtonClick">
              <fa icon="file-signature" />
              Sign Message
            </b-dropdown-item>
            <b-dropdown-divider />
            <b-dropdown-item disabled href="#">
              <fa icon="wallet" />
              Wallets (soon!)
            </b-dropdown-item>
            <b-dropdown-divider />
            <b-dropdown-item disabled href="#">
              <fa icon="laptop" />
              Devices (soon!)
            </b-dropdown-item>
            <b-dropdown-divider />
            <b-dropdown-item :to="{name:'listClaims'}">
              View All Claims
            </b-dropdown-item>
            <b-dropdown-divider />
            <b-dropdown-item :to="{name:'listDIDs'}">
              View All Personas
            </b-dropdown-item>
            <b-dropdown-divider />
            <b-dropdown-item :to="{ name: 'about' }">About</b-dropdown-item>
          </b-dropdown>
        </template>
      </b-col>
      <b-col cols="6" class="app-logo">
        <b-img :src="require('@/assets/images/logo.svg')" alt="Prometheus logo" />
      </b-col>
      <b-col cols="3"></b-col>
      <b-modal
          id="modal-did-created"
          title="Your Persona has been Created!"
          no-close-on-esc
        >
          <div v-if="createdDid" class="did-created">
            <b-img :src="createdDid.avatar" alt="avatar image" class="did-avatar" />
            <div class="did-label">{{ createdDid.label }}</div>
          </div>

          <template v-slot:modal-footer="{ cancel }">
            <b-button size="sm" class="text-uppercase" variant="outline-primary" @click="cancel()">
              Close
            </b-button>
            <b-button
              size="sm"
              class="text-uppercase"
              variant="primary"
              @click="onSetCreatedToActive"
            >
              Set to Active
            </b-button>
          </template>
        </b-modal>
    </b-row>
    <template v-if="!showProfile">
      <b-img
        :src="require('@/assets/images/logo.svg')"
        class="logo-without-profile"
        alt="Prometheus logo"
      />
      {{ appName }}
      <b-breadcrumb :items="breadcrumb" class="small mt-2 mb-2" />
    </template>
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
            id="sign.message"
            name="sign.message"
            v-model="sign.message"
            rows="3"
            max-rows="6"
            v-validate="{ required: true }"
            :state="validateState('sign.message')"
          ></b-form-textarea>
        </b-form-group>
        <b-button
          variant="primary"
          class="text-uppercase"
          block
          :disabled="sign.signing"
          @click="onSignMessageButtonClick"
        >
          Sign
          <b-spinner small class="ml-1" v-if="sign.signing" />
        </b-button>
        <b-alert show v-if="sign.error" variant="danger" class="mt-3">
          <strong>An error occured during signing:</strong><br>
          {{ sign.error }}
        </b-alert>
        <b-form-group
          label="Signature:"
          label-for="sign-signature"
          description="This is the signature you can send back"
          v-if="sign.signature"
        >
          <b-form-textarea
            id="sign-signature"
            v-model="sign.signature"
            rows="3"
            max-rows="6"
            disabled
          ></b-form-textarea>
        </b-form-group>
        <b-button
          variant="outline-primary"
          v-clipboard:copy="sign.signature"
          v-clipboard:success="onCopySignatureButtonClick"
          v-if="sign.signature"
          class="text-uppercase"
        >
          Copy &amp; Close
        </b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import api from '@/api';

export default {
  name: 'Header',
  props: {
    appName: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      createdDid: undefined,
      sign: {
        message: '',
        signing: false,
        signature: '',
        error: '',
      },
    };
  },
  computed: {
    ...mapGetters(['activeDid', 'dids']),
    breadcrumb() {
      const { breadcrumb } = this.$route.meta;
      return breadcrumb ? breadcrumb(this.$route) : [];
    },
    showProfile() {
      return this.$route.meta.showProfile;
    },
  },
  methods: {
    async onCreateDid() {
      this.createdDid = await this.$store.dispatch('createDID');
      this.$bvModal.show('modal-did-created');
    },
    async onDidSelected(id) {
      await this.$store.dispatch('setActiveDID', id);
      this.$router.push({ name: 'viewDID', params: { did: id } });
    },
    async onSetCreatedToActive() {
      await this.$store.dispatch('setActiveDID', this.createdDid.id);
      this.$bvModal.hide('modal-did-created');
      this.$router.push({ name: 'viewDID', params: { did: this.createdDid.id } });
    },

    // MESSAGE SIGN
    onSignMessageMenuButtonClick() {
      this.sign.message = '';
      this.sign.signature = '';
      this.sign.error = '';
      this.$bvModal.show('modal-sign-message');
    },
    async onSignMessageButtonClick() {
      if (!await this.$validator.validateAll()) {
        return;
      }

      this.sign.signing = true;
      this.sign.error = '';
      try {
        const result = await api.signClaim(this.sign.message);
        this.sign.signature = result.data;
      } catch (e) {
        if (e.response && e.response.data) {
          this.sign.error = e.response.data;
        } else {
          this.sign.error = e;
        }
      }

      this.sign.signing = false;
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

<style scoped lang="scss">
@import './Header.scss';
</style>
