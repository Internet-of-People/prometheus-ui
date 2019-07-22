<template>
  <div>
    <Loader :loading="loading">
      <h2 class="mb-3 text-primary">DID document</h2>
      <b-card>
        <b-row id="avatar-row" class="mx-0 mb-3" align-v="center" role="group">
          <b-col id="avatar" cols="2" class="px-0">
            <b-img :src="avatar" alt="avatar image"/>
          </b-col>
          <b-col>
            <b-button
              size="sm"
              variant="outline-primary"
              class="text-uppercase"
              @click="$refs.avatarSelector.click()"
              :disabled="savingAvatar"
            >
              Change avatar
              <b-spinner small v-if="savingAvatar" />
            </b-button>
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
        <b-tooltip target="avatar-row" placement="left">
          <fa icon="user-lock" class="mr-2" /> Your avatars will not be shared with anyone
        </b-tooltip>
        <b-row id="id-row">
          <b-input-group>
            <b-input-group-prepend class="col-2 px-0">
              <b-input-group-text class="w-100 justify-content-end text-uppercase">
                ID:
              </b-input-group-text>
            </b-input-group-prepend>
            <b-form-input readonly plaintext v-model="did" />
          </b-input-group>
        </b-row>
        <b-tooltip target="id-row" placement="left">
          <fa icon="unlock-alt" class="mr-2" /> You might choose to share your IDs
        </b-tooltip>
        <b-row id="alias-row">
          <b-input-group>
            <b-input-group-prepend class="col-2 px-0">
              <b-input-group-text class="w-100 justify-content-end text-uppercase">
                Alias:
              </b-input-group-text>
            </b-input-group-prepend>
            <b-form-input
              name="alias"
              :readonly="!editingAlias"
              v-model="alias"
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
          </b-input-group>
        </b-row>
        <b-tooltip target="alias-row" placement="left">
          <fa icon="user-lock" class="mr-2" /> Your aliases will be kept private
        </b-tooltip>
      </b-card>
      <div class="d-flex justify-content-between align-items-center">
        <h2 class="my-3 text-primary">Claims</h2>
        <b-button
          variant="primary"
          :to="{ name:'createClaim', params:{ did }}"
        >
          CREATE NEW CLAIM
        </b-button>
      </div>
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
          <b-tooltip target="claims-panel" placement="left">
            <fa icon="unlock-alt" class="mr-2" />
            You will only share your claims with their witnesses
          </b-tooltip>
        </template>
      </Loader>
      <b-button to="/vault/dids" variant="light" class="text-uppercase mt-4">Back to DIDs</b-button>
    </Loader>
  </div>
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
