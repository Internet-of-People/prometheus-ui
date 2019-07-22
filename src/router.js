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
        breadcrumb: [
          { text: '1. GENERATING MNEMONIC', active: true },
          { text: '2. VALIDATING' },
          { text: '3. FINISH' },
        ],
        title: 'CREATE NEW VAULT',
        homeUrl: GUEST_HOME_URL,
      },
    },
    {
      path: '/validatevault',
      name: 'validateVault',
      component: ValidateVault,
      meta: {
        requiresAuth: false,
        breadcrumb: [
          { text: '1. GENERATING MNEMONIC' },
          { text: '2. VALIDATING', active: true },
          { text: '3. FINISH' },
        ],
        title: 'CREATE NEW VAULT',
        homeUrl: GUEST_HOME_URL,
      },
    },
    {
      path: '/vaultcreated',
      name: 'vaultCreated',
      component: VaultCreation,
      // component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
      meta: {
        requiresAuth: true,
        breadcrumb: [
          { text: '1. GENERATING MNEMONIC' },
          { text: '2. VALIDATING' },
          { text: '3. FINISH', active: true },
        ],
        title: 'CREATE NEW VAULT',
        homeUrl: GUEST_HOME_URL,
      },
    },
    {
      path: '/vault/dids',
      name: 'listDIDs',
      component: ListDIDs,
      meta: {
        requiresAuth: true,
        breadcrumb: [],
        title: 'VAULT / DIDs',
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
        breadcrumb: [
          { text: 'DIDs', to: '/vault/dids', rel: 'parent' },
        ],
        title: 'DID DETAILS',
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
        title: 'VAULT / CLAIMS / CREATE NEW',
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
        breadcrumb: [
          { text: 'Claims', active: true },
        ],
        title: 'CLAIMS',
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
        breadcrumb: [
          { text: 'Claims', to: '/vault/claims', rel: 'parent' },
        ],
        title: 'Claim details',
        homeUrl: SIGNED_IN_HOME_URL,
      },
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: {
        requiresAuth: true,
        title: 'ABOUT',
        homeUrl: SIGNED_IN_HOME_URL,
      },
    },
  ],
});
