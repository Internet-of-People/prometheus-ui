<template>
  <Content>
    <b-row>
      <b-col cols="12"><b-img :src="did.avatar"></b-img></b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col cols="1"><label>ID:</label></b-col>
      <b-col cols="11"><label>{{idPrefix}}:{{did.id}}</label></b-col>
    </b-row>
    <b-row>
      <b-col cols="1"><label>LABEL:</label></b-col>
      <b-col cols="11">
        <label v-if="editAlias">{{did.alias}}
            <fa @click="editAlias = !editAlias" icon="pen" />
        </label>
        <b-form-input v-else :model="alias">
        </b-form-input>
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col>
        <b-button @click="saveDID" variant="primary" to="/vault/dids">
          SAVE
        </b-button>
      </b-col>
    </b-row>
  </Content>
</template>

<script>
import { mapGetters } from 'vuex';
import Content from '@/components/Content.vue';
import api from '@/api';

export default {
  components: {
    Content,
  },
  data() {
    return {
      // TODO: add specific call for loading did details
      loading: true,
      idPrefix: 'did:mercury',
      // TODO: add relevant message here
      id: this.$route.params.id,
      alias: '',
      editAlias: true,
    };
  },
  computed: {
    ...mapGetters(['dids']),
    did() {
      return this.dids.filter(did => did.alias === this.id)[0];
    },
  },
  methods: {
    async saveDID() {
      api.renameDIDAlias(this.did, this.alias);
    },
  },
};
</script>

<style>
img{
    height: 80px;
    width: 80px;
    align-items: center;
    display: block;
}
</style>
