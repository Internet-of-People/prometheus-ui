<template>
  <Content>
    <b-container fluid>
      <b-row class="my-1">
        <b-img center :src="did.avatar" alt="Center image"></b-img>
      </b-row>
      <b-row class="my-1">
        <b-col sm="3"><label>ID:</label></b-col>
        <b-col sm="9"><label>{{idPrefix}}:{{did.id}}</label></b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="3"><label>LABEL:</label></b-col>
        <b-col sm="9">
          <label v-if="editAlias">{{did.alias}}
             <fa @click="editAlias = !editAlias" icon="pen" />
          </label>
          <b-form-input v-else :model="alias" :type="type">
          </b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-button @click="saveDID" variant="primary" to="/vault/dids">
                SAVE
        </b-button>
      </b-row>
    </b-container>
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
