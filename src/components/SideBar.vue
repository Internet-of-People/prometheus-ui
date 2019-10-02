<template>
  <div class="content sidebar-inner">
    <div class="sidebar-title">
      Your Personas
    </div>
    <b-list-group>
      <div class="active-persona">
        <div class="avatar-container">
          <b-img :src="activeDid.avatar" alt="avatar image" class="avatar" />
        </div>
        <div class="label d-xl-none">{{ activeDid.label }}</div>
        <div class="label screen-xl d-lg-none d-xl-inline-block">{{ activeDid.label }}</div>
      </div>
      <div class="personas">
        <b-list-group-item
          v-for="did in dids"
          :key="did.id"
          :class="did.id===activeDid.id?'d-none':''"
          @click="onDidSelected(did.id)"
        >
          <div class="avatar-container">
            <b-img :src="did.avatar" alt="avatar image" class="avatar" />
          </div>
          <div class="label d-xl-none">{{ did.label }}</div>
          <div class="label screen-xl d-lg-none d-xl-inline-block">{{ did.label }}</div>
        </b-list-group-item>
      </div>
      <b-list-group-item class="top-border" @click="onCreateDid">
        <fa icon="address-card" />
        Create New Persona
      </b-list-group-item>
      <b-list-group-item @click="onSignMessageMenuButtonClick">
        <fa icon="file-signature" />
        Sign Message
      </b-list-group-item>
      <b-list-group-item href="#" disabled>
        <fa icon="wallet" />
        Wallets (soon!)
      </b-list-group-item>
      <b-list-group-item href="#" disabled>
        <fa icon="laptop" />
        Devices (soon!)
      </b-list-group-item>
      <b-list-group-item
        :to="{name:'listClaims'}"
        :class="getClassIfActive('listClaims')"
      >
        View All Claims
      </b-list-group-item>
      <b-list-group-item
        :to="{name:'listDIDs'}"
        :class="getClassIfActive('listDIDs')"
      >
        View All Personas
      </b-list-group-item>
      <b-list-group-item
        :to="{ name: 'about' }"
        :class="getClassIfActive('about')+' top-border'"
      >
        About
      </b-list-group-item>
    </b-list-group>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import EventBus from '@/eventbus';

export default {
  computed: {
    ...mapGetters(['activeDid', 'dids']),
  },
  methods: {
    async onDidSelected(id) {
      await this.$store.dispatch('setActiveDID', id);
      this.$router.push({ name: 'viewDID', params: { did: id } });
    },
    async onCreateDid() {
      const createdDid = await this.$store.dispatch('createDID');
      EventBus.$emit('open-did-created-modal', createdDid);
    },
    onSignMessageMenuButtonClick() {
      EventBus.$emit('open-sign-message-modal');
    },
    getClassIfActive(expected) {
      return expected === this.$route.name ? 'active' : '';
    },
  },
};
</script>
<style scoped lang="scss">
@import './SideBar.scss';
</style>
