import Vue from 'vue';
import Router from 'vue-router';
import {
  Introduction,
  CreateNewVault,
  ValidateVault,
  VaultCreation,
  About,
  ListDIDs,
  ViewDID,
  CreateClaim,
  ListClaims,
  ViewClaim,
} from '@/views';

import {
  TopCreateNewClaimButton,
  TopCreateNewDIDButton,
} from '@/components';

Vue.use(Router);

const SIGNED_IN_HOME_URL = '/vault/dids';
const GUEST_HOME_URL = '/';

export default new Router({
  mode: 'history',
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'intro',
      component: Introduction,
      meta: { requiresAuth: false },
    },
    {
      path: '/createnewvault',
      name: 'createNewVault',
      component: CreateNewVault,
      meta: {
        requiresAuth: false,
        breadcrumb: () => [
          { text: '1. Generating Mnemonic', active: true },
          { text: '2. Validating' },
          { text: '3. Finish' },
        ],
        title: 'Create New Vault',
        homeUrl: GUEST_HOME_URL,
      },
    },
    {
      path: '/validatevault',
      name: 'validateVault',
      component: ValidateVault,
      meta: {
        requiresAuth: false,
        breadcrumb: () => [
          { text: '1. Generating Mnemonic' },
          { text: '2. Validating', active: true },
          { text: '3. Finish' },
        ],
        title: 'Create New Vault',
        homeUrl: GUEST_HOME_URL,
      },
    },
    {
      path: '/vaultcreated',
      name: 'vaultCreated',
      component: VaultCreation,
      meta: {
        requiresAuth: true,
        breadcrumb: () => [
          { text: '1. Generating Mnemonic' },
          { text: '2. Validating' },
          { text: '3. Finish', active: true },
        ],
        title: 'Create New Vault',
        homeUrl: GUEST_HOME_URL,
      },
    },
    {
      path: '/vault/dids',
      name: 'listDIDs',
      component: ListDIDs,
      meta: {
        requiresAuth: true,
        title: 'Vault / DIDs',
        homeUrl: SIGNED_IN_HOME_URL,
        topBarButton: TopCreateNewDIDButton,
      },
    },
    {
      path: '/vault/dids/:did',
      name: 'viewDID',
      component: ViewDID,
      meta: {
        requiresAuth: true,
        breadcrumb: route => [
          { text: 'DIDs', to: '/vault/dids', rel: 'parent' },
          { text: route.params.did },
        ],
        title: 'DID Details',
        homeUrl: SIGNED_IN_HOME_URL,
      },
      props: true,
    },
    {
      path: '/vault/claims/create/:did?',
      name: 'createClaim',
      component: CreateClaim,
      meta: {
        requiresAuth: true,
        title: 'Vault / Claims / Create New',
        homeUrl: SIGNED_IN_HOME_URL,
      },
      props: true,
    },
    {
      path: '/vault/claims',
      name: 'listClaims',
      component: ListClaims,
      meta: {
        requiresAuth: true,
        breadcrumb: () => [
          { text: 'Claims', active: true },
        ],
        title: 'Claims',
        homeUrl: SIGNED_IN_HOME_URL,
        topBarButton: TopCreateNewClaimButton,
      },
    },
    {
      path: '/vault/claims/:id',
      name: 'viewClaim',
      component: ViewClaim,
      meta: {
        requiresAuth: true,
        breadcrumb: route => [
          { text: 'Claims', to: '/vault/claims', rel: 'parent' },
          { text: route.params.id },
        ],
        title: 'Claims Details',
        homeUrl: SIGNED_IN_HOME_URL,
      },
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: {
        requiresAuth: true,
        title: 'About',
        homeUrl: SIGNED_IN_HOME_URL,
      },
    },
  ],
});
