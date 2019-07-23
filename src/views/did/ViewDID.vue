<template>
  <b-row no-gutters>
    <b-col cols="8">
      <Loader :loading="loading">
        <b-card>
          <h3 class="mb-3 text-primary">DID Document</h3>
          <hr>
          <b-row>
            <b-col cols="6">
              <b-form-group
                label="DID ID"
                label-for="did"
              >
                <b-form-input
                  id="did"
                  name="did"
                  v-model="did"
                  disabled
                  aria-describedby="id-desc"
                />
                <b-form-text id="id-desc">
                  <fa icon="unlock-alt" />
                  This is your DID's unique ID, that you might choose to share.
                </b-form-text>
              </b-form-group>
              <b-form-group
                label="Alias"
                label-for="alias"
              >
                <b-input-group>
                  <b-form-input
                    id="alias"
                    name="alias"
                    v-model="alias"
                    aria-describedby="alias-desc"
                    :readonly="!editingAlias"
                    v-validate="{ required: true }"
                    @keyup.enter="renameAlias()"
                    @keyup.esc="cancelAlias()"
                    @dblclick="editAlias()"
                    :state="editingAlias ? validateState('alias') : null"
                  />
                  <b-input-group-append>
                    <b-button
                      size="sm"
                      variant="outline-secondary"
                      class="text-uppercase"
                      v-if="editingAlias"
                      @click="cancelAlias"
                      :disabled="savingAlias">
                      Cancel
                    </b-button>
                    <b-button
                      size="sm"
                      variant="outline-primary"
                      class="text-uppercase"
                      v-if="editingAlias"
                      @click="renameAlias"
                      :disabled="savingAlias">
                      Save
                      <b-spinner small v-if="savingAlias" />
                    </b-button>
                    <b-button
                      size="sm"
                      variant="outline-primary"
                      class="text-uppercase"
                      v-else
                      @click="editAlias">
                      Edit
                    </b-button>
                  </b-input-group-append>
                  <b-form-text id="alias-desc">
                    <fa icon="user-lock" />
                    This alias is an easier memorizable form of your DID.
                    Your aliases will be kept private.
                  </b-form-text>
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col cols="3">
              <div>Your Avatar</div>
              <div style="position:relative;">
                <b-img :src="avatar" fluid-grow alt="avatar image" class="mt-2 d-block"/>

                <b-button
                  size="sm"
                  variant="primary"
                  class="text-uppercase mt-3 d-block"
                  @click="$refs.avatarSelector.click()"
                  :disabled="savingAvatar"
                  style="position:absolute;bottom:0.5rem;left:0.5rem"
                >
                  Change
                  <b-spinner small v-if="savingAvatar" />
                </b-button>
              </div>
              <b-form-text>
                <fa icon="user-lock" /> Your avatar will not be shared with anyone.
              </b-form-text>
              <!-- hidden file selector, because Bootstrap-vue -->
              <!-- has no Browse button without filename -->
              <input
                ref="avatarSelector"
                type="file"
                :v-model="avatar"
                class="d-none"
                accept=".png"
                @change="changeAvatar" />
            </b-col>
          </b-row>
        </b-card>
        <b-card class="mt-3">
          <h3 class="text-primary">Claims</h3>
          <hr>
          <Loader :loading="loadingClaims" text="Loading claims...">
            <template v-if="!claims || !claims.length">
              <b-alert show variant="info">
                No claims defined for this DID yet.
              </b-alert>
            </template>
            <template v-else>
              <ClaimList
                :claims="claims"
                :schemas="claimSchemas"
              />
            </template>
            <b-button
              variant="primary"
              class="text-uppercase"
              :to="{ name:'createClaim', params:{ did }}"
            >
              Create New Claim
            </b-button>
          </Loader>
        </b-card>
        <b-button to="/vault/dids" variant="light" class="text-uppercase mt-4">
          <fa icon="angle-left" /> Back to DIDs
        </b-button>
      </Loader>
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters } from 'vuex';
import api from '@/api';
import { Loader, ClaimList } from '@/components';

export default {
  components: {
    Loader,
    ClaimList,
  },
  computed: {
    ...mapGetters(['claimSchemas']),
  },
  data() {
    return {
      loading: true,
      loadingClaims: true,
      editingAlias: false,
      aliasBeforeEdit: '',
      savingAlias: false,
      alias: '',
      avatar: '',
      savingAvatar: false,
      claims: [],
    };
  },
  props: {
    did: String,
  },
  async created() {
    const { data: didDetails } = await api.getDID(this.did);
    this.alias = didDetails.alias;
    this.avatar = didDetails.avatar;
    this.loading = false;

    const { data: claims } = await api.getDIDClaims(this.did);
    this.claims = claims;
    this.loadingClaims = false;
  },
  methods: {
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
    editAlias() {
      this.editingAlias = true;
      this.aliasBeforeEdit = this.alias;
    },
    cancelAlias() {
      this.alias = this.aliasBeforeEdit;
      this.editingAlias = false;
    },
    renameAlias() {
      this.$validator.validateAll().then((result) => {
        if (!result) {
          return;
        }

        this.savingAlias = true;
        this.$store.dispatch('renameDIDAlias', {
          didId: this.did,
          alias: this.alias,
        }).then(() => {
          this.aliasBeforeEdit = this.alias;
          this.editingAlias = false;
          this.savingAlias = false;
        });
      });
    },
    changeAvatar(event) {
      // file reader logic is taken from docs
      // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/onload
      // get file and then read converted file. Hence, nested event
      const file = event.currentTarget.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async (e) => {
        this.savingAvatar = true;
        await this.$store.dispatch('changeDIDAvatar', {
          didId: this.did,
          avatar: e.target.result,
        });
        this.avatar = e.target.result;
        this.savingAvatar = false;
      };
    },
  },
};
</script>

<style scoped lang="scss">
@import './ViewDID.scss';
</style>
