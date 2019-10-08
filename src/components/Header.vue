<template>
  <div class="pt-2 pb-2">
    <b-row no-gutters v-if="showProfile" class="mb-2 header-with-profile">
      <b-col sm="5" class="active-did d-lg-none">
        <template v-if="activeDid">
          <b-dropdown
            variant="primary"
            class="scrollable-menu"
          >
            <template v-slot:button-content>
              <div class="button-inner">
                <b-img :src="activeDid.avatar" alt="avatar image" class="avatar" />
                <div class="did-label">{{ activeDid.label }}</div>
              </div>
            </template>
            <b-dropdown-text :v-if="dids.length>1">
              Your Personas:
            </b-dropdown-text>
            <b-dropdown-item
              v-for="did in dids"
              :key="did.id"
              :class="did.id===activeDid.id?'active':''"
              @click="onDidSelected(did.id)"
            >
              <div class="avatar-container">
                <b-img :src="did.avatar" alt="avatar image" class="avatar" />
              </div>
              <div>{{ did.label }}</div>
            </b-dropdown-item>
            <b-dropdown-divider :v-if="dids.length>1" />
            <b-dropdown-item @click="onCreateDid">
              <fa icon="address-card" />
              Create New Persona
            </b-dropdown-item>
            <b-dropdown-item @click="onSignMessageMenuButtonClick">
              <fa icon="file-signature" />
              Sign Message
            </b-dropdown-item>
            <b-dropdown-item disabled href="#">
              <fa icon="wallet" />
              Wallets (soon!)
            </b-dropdown-item>
            <b-dropdown-item disabled href="#">
              <fa icon="laptop" />
              Devices (soon!)
            </b-dropdown-item>
            <b-dropdown-item :to="{name:'listClaims'}" :class="getClassIfActive('listClaims')">
              View All Claims
            </b-dropdown-item>
            <b-dropdown-item :to="{name:'listDIDs'}" :class="getClassIfActive('listDIDs')">
              View All Personas
            </b-dropdown-item>
            <b-dropdown-divider />
            <b-dropdown-item :to="{ name: 'about' }" :class="getClassIfActive('about')">
              About
            </b-dropdown-item>
          </b-dropdown>
        </template>
      </b-col>
      <b-col sm="2" lg="12" class="app-logo">
        <b-img :src="require('@/assets/images/logo.svg')" alt="Prometheus logo" />
      </b-col>
      <b-col cols="5"></b-col>
    </b-row>
    <template v-if="!showProfile">
      <b-img
        :src="require('@/assets/images/logo.svg')"
        class="logo-without-profile"
        alt="Prometheus logo"
      />
      {{ appName }}
      <b-breadcrumb :items="breadcrumb" class="small mt-2 mb-2" />
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import EventBus from '@/eventbus';

export default {
  name: 'Header',
  props: {
    appName: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapGetters(['activeDid', 'dids']),
    breadcrumb() {
      const { breadcrumb } = this.$route.meta;
      return breadcrumb ? breadcrumb(this.$route) : [];
    },
    showProfile() {
      return this.$route.meta.showProfile;
    },
  },
  methods: {
    async onCreateDid() {
      const createdDid = await this.$store.dispatch('createDID');
      EventBus.$emit('open-did-created-modal', createdDid);
    },
    async onDidSelected(id) {
      await this.$store.dispatch('setActiveDID', id);
      this.$router.push({ name: 'viewDID', params: { did: id } });
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
@import './Header.scss';
</style>
