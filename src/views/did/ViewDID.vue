<template>
  <b-row no-gutters>
    <b-col>
      <Loader :loading="loading">
        <b-card>
          <h3 class="mb-3 text-primary">Persona</h3>
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
                  This is your persona's unique ID, that you might choose to share.
                </b-form-text>
              </b-form-group>
              <b-form-group
                label="Label"
                label-for="label"
              >
                <b-input-group>
                  <b-form-input
                    id="label"
                    name="label"
                    v-model="label"
                    aria-describedby="label-desc"
                    :readonly="!editingLabel"
                    @keyup.enter="renameLabel()"
                    @keyup.esc="cancelLabel()"
                    @dblclick="editLabel()"
                  />
                  <b-input-group-append>
                    <b-button
                      size="sm"
                      variant="outline-secondary"
                      class="text-uppercase"
                      v-if="editingLabel"
                      @click="cancelLabel"
                      :disabled="savingLabel">
                      Cancel
                    </b-button>
                    <b-button
                      size="sm"
                      variant="outline-primary"
                      class="text-uppercase"
                      v-if="editingLabel"
                      @click="renameLabel"
                      :disabled="savingLabel">
                      Save
                      <b-spinner small v-if="savingLabel" />
                    </b-button>
                    <b-button
                      size="sm"
                      variant="outline-primary"
                      class="text-uppercase"
                      v-else
                      @click="editLabel">
                      Edit
                    </b-button>
                  </b-input-group-append>
                  <b-form-text id="label-desc">
                    <fa icon="user-lock" />
                    This label is an easier memorizable form of your persona.
                    Your labels will be kept private.
                  </b-form-text>
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col cols="3">
              <div>Your Avatar</div>
              <div style="position:relative;">
                <b-img :src="avatar.src" fluid-grow alt="avatar image" class="mt-2 d-block"/>

                <b-button
                  size="sm"
                  variant="primary"
                  class="text-uppercase mt-3 d-block"
                  @click="$refs.avatarSelector.click()"
                  :disabled="avatar.saving"
                  style="position:absolute;bottom:0.5rem;left:0.5rem"
                >
                  Change
                  <b-spinner small v-if="avatar.saving" />
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
                :v-model="avatar.src"
                class="d-none"
                accept=".png"
                @change="changeAvatar" />
              <b-alert v-if="avatar.showError" show class="mt-2 mb-0" variant="danger">
                Maximum image size is 10MB
              </b-alert>
            </b-col>
          </b-row>
        </b-card>
        <b-card class="mt-3">
          <h3 class="text-primary">Claims</h3>
          <hr>
          <Loader :loading="loadingClaims" text="Loading claims...">
            <template v-if="!activeDidClaims || !activeDidClaims.length">
              <b-alert show variant="info">
                No claims defined for this persona yet.
              </b-alert>
            </template>
            <template v-else>
              <ClaimList
                :claims="activeDidClaims"
                :schemas="claimSchemas"
                @listUpdated="refreshClaimList"
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
    ...mapGetters(['activeDidClaims', 'claimSchemas']),
  },
  data() {
    return {
      loading: true,
      loadingClaims: true,
      editingLabel: false,
      labelBeforeEdit: '',
      savingLabel: false,
      label: '',
      avatar: {
        src: '',
        showError: false,
        saving: false,
      },
    };
  },
  props: {
    did: String,
  },
  async mounted() {
    const { data: didDetails } = await api.getActiveDID();
    this.label = didDetails.label;
    this.avatar.src = didDetails.avatar;
    this.loading = false;

    this.loadingClaims = true;
    await this.$store.dispatch('listActiveDidClaims');
    this.loadingClaims = false;
  },
  methods: {
    async refreshClaimList() {
      await this.$store.dispatch('listActiveDidClaims');
    },
    editLabel() {
      this.editingLabel = true;
      this.labelBeforeEdit = this.label;
    },
    cancelLabel() {
      this.label = this.labelBeforeEdit;
      this.editingLabel = false;
    },
    renameLabel() {
      this.savingLabel = true;
      this.$store.dispatch('renameDIDLabel', this.label).then((label) => {
        this.label = label;
        this.editingLabel = false;
        this.savingLabel = false;
      });
    },
    changeAvatar(event) {
      this.avatar.showError = false;
      // file reader logic is taken from docs
      // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/onload
      // get file and then read converted file. Hence, nested event
      const file = event.currentTarget.files[0];

      if (file.size > 10 * 1000 * 1000) {
        this.avatar.showError = true;
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async (e) => {
        this.avatar.saving = true;
        await this.$store.dispatch('changeDIDAvatar', e.target.result);
        this.avatar.src = e.target.result;
        this.avatar.saving = false;
      };
    },
  },
};
</script>

<style scoped lang="scss">
@import './ViewDID.scss';
</style>
