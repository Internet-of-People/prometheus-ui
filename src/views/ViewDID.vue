<template>
  <Content>
    <Loader :loading="loading" />
    <template v-if="!loading">
      <b-row>
        <b-col style="margin: 0 auto; display: block;" cols="12">
          <b-img center :src="avatar"></b-img>
          <b-button
          center
          size="sm"
          variant="outline-primary"
          class="mt-3 center-align"
          @click="$refs.avatarSelector.click()"
          :disabled="savingAlias">
          CHANGE AVATAR
            <input ref="avatarSelector"
            type="file" :v-model="avatar"
            style='display: none;'
            accept=".png"
            @change="changeAvatar" />
            <b-spinner small v-if="savingAvatar" />
          </b-button>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col cols="1"><label>ID:</label></b-col>
        <b-col cols="11"><label>{{ activeDid.id }}</label></b-col>
      </b-row>
      <b-row>
        <b-col cols="1"><label>ALIAS:</label></b-col>
        <b-col cols="11">
          <template v-if="!editingAlias">{{ activeDid.alias }}</template>
          <b-form-input v-if="editingAlias" v-model="alias" />
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
    </template>
  </Content>
</template>

<script>
import { mapGetters } from 'vuex';
import Content from '@/components/Content.vue';
import Loader from '@/components/Loader.vue';

export default {
  components: {
    Content,
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
    renameAlias() {
      this.savingAlias = true;
      this.$store.dispatch('renameDIDAlias', {
        didId: this.activeDid.id,
        alias: this.alias,
      }).then(() => {
        this.editingAlias = false;
        this.savingAlias = false;
      });
    },
    changeAvatar(event) {
      // file reader logic is taken from docs
      // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/onload
      // get file and then read converted file. Hence, nested event
      const file = event.currentTarget.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function onAvatarLoad(e) {
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

<style>
img{
    height: 80px;
    width: 80px;
    align-items: center;
}

/* not available in vue-bootstrap btn */
.center-align{
  display: block;
  margin: 0 auto;
}
</style>
