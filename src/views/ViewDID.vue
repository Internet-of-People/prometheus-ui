<template>
    <Content>
        <img :src="did.avatar" />
        <div>{{idPrefix}}:{{did.id}}</div>
        <input v-model="alias"/>
        <b-button @click="saveDID"
            variant="primary" to="">
            SAVE
        </b-button>
    </Content>
</template>

<script>
import { mapGetters } from 'vuex';
import Content from '@/components/Content.vue';

export default {
  components: {
    Content,
  },
  data() {
    return {
      loading: true,
      idPrefix: 'did:mercury',
      // TODO: add relevant message here
      msg: 'some tooltip msg',
      id: this.$route.params.id,
      alias: '',
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
      this.$store.dispatch('renameDIDAlias', { did: this.did, alias: this.alias }).then(() => {
        this.$router.push('/vault/dids');
      });
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
