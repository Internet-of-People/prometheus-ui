<template>
  <div>
    <Loader :loading="loading" />
    <template v-if="!loading">
      <b-form @submit.stop.prevent="onSubmit">
        <b-row>
          <b-col cols="8">
            <b-card>
              <b-row>
                <b-col cols="8">
                  <b-img :src="activeDid.avatar"/>
                  <b-button
                    center
                    size="sm"
                    variant="outline-primary"
                    class="mt-3 ml-3"
                    @click="$refs.avatarSelector.click()"
                    :disabled="savingAvatar"
                  >
                    CHANGE AVATAR
                    <b-spinner small v-if="savingAvatar" />
                  </b-button>
                  <input
                    ref="avatarSelector"
                    type="file"
                    :v-model="avatar"
                    class="d-none"
                    accept=".png"
                    @change="changeAvatar" />
                </b-col>
              </b-row>
              <b-row class="mt-3">
                <b-col cols="1"><label>ID:</label></b-col>
                <b-col cols="7"><label>{{ activeDid.id }}</label></b-col>
              </b-row>
              <b-row>
                <b-col cols="1"><label>ALIAS:</label></b-col>
                <b-col cols="11">
                  <template v-if="!editingAlias">{{ activeDid.alias }}</template>
                  <b-form-input
                    name="alias"
                    v-if="editingAlias"
                    v-model="alias"
                    v-validate="{ required: true }"
                    :state="validateState('alias')"
                  />
                  <b-button
                    size="sm"
                    variant="outline-primary"
                    class="ml-3"
                    v-if="!editingAlias"
                    @click="editingAlias = true">
                    EDIT
                  </b-button>
                  <b-button
                    size="sm"
                    variant="outline-primary"
                    class="mt-3"
                    v-if="editingAlias"
                    @click="renameAlias"
                    :disabled="savingAlias">
                    SAVE
                    <b-spinner small v-if="savingAlias" />
                  </b-button>
                </b-col>
              </b-row>
            </b-card>
          </b-col>
        </b-row>
        <b-row class="clear mt-4">
          <b-col>
            <b-button to="/vault/dids" variant="light" class="mr-4">BACK TO DIDS</b-button>
          </b-col>
        </b-row>
      </b-form>
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
      editAlias: true,
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
