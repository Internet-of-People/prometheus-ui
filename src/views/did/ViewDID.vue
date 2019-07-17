<template>
  <div>
    <Loader :loading="loading" />
    <template v-if="!loading">
      <b-card>
        <b-row class="mx-0 mb-3" align-v="center">
          <b-col id="avatar" cols="2" class="px-0">
            <b-img id :src="activeDid.avatar" alt="avatar image"/>
          </b-col>
          <b-col cols="10">
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
        <b-input-group>
          <b-input-group-prepend class="col-2 px-0">
            <b-input-group-text class="w-100 justify-content-end text-uppercase">
              ID:
            </b-input-group-text>
          </b-input-group-prepend>
          <b-form-input readonly v-model="activeDid.id" />
        </b-input-group>
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
            :state="editingAlias ? validateState('alias') : null"
          />
          <b-input-group-append>
            <b-button
              size="sm"
              ref="saveButton"
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
              @click="editingAlias = true">
              Edit
            </b-button>
          </b-input-group-append>
        </b-input-group>
      </b-card>
      <b-button to="/vault/dids" variant="light" class="mt-4 text-uppercase">Back to DIDs</b-button>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { Loader } from '@/components';

export default {
  components: {
    Loader,
  },
  data() {
    return {
      loading: true,
      editingAlias: false,
      savingAlias: false,
      alias: '',
      avatar: '',
      savingAvatar: false,
      form: {

      },
    };
  },
  computed: {
    ...mapGetters(['activeDid']),
  },
  beforeCreate() {
    this.$store.dispatch('getDID', this.$route.params.id).then(() => {
      this.loading = false;
      this.alias = this.activeDid.alias;
      this.avatar = this.activeDid.avatar;
    });
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
    renameAlias() {
      this.$validator.validateAll().then((result) => {
        if (!result) {
          return;
        }

        this.savingAlias = true;
        this.$store.dispatch('renameDIDAlias', {
          didId: this.activeDid.id,
          alias: this.alias,
        }).then(() => {
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
      reader.onload = (e) => {
        this.savingAvatar = true;
        this.$store.dispatch('changeDIDAvatar', {
          didId: this.activeDid.id,
          avatar: e.target.result,
        }).then(() => {
          this.savingAvatar = false;
        });
      };
    },
  },
};
</script>

<style scoped lang="scss">
@import './ViewDID.scss';
</style>
