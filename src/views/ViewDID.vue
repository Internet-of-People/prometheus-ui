<template>
  <div>
    <Loader :loading="loading" />
    <template v-if="!loading">
      <b-row>
        <b-col cols="12"><b-img :src="activeDid.avatar"></b-img></b-col>
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Loader from '@/components/Loader.vue';

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
    };
  },
  computed: {
    ...mapGetters(['activeDid']),
  },
  beforeCreate() {
    this.$store.dispatch('getDID', this.$route.params.id).then(() => {
      this.loading = false;
      this.alias = this.activeDid.alias;
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
    changeAvatar() {
      // TODO for Pooja:
      // this.$store.dispatch('changeDIDAvatar', this.activeDid.id)
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
</style>
