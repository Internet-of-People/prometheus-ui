import Vue from 'vue';
import Router from 'vue-router';
import {
  Introduction,
  CreateNewVault,
  ValidateVault,
  VaultCreation,
  DIDs,
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
          { text: '1. GENERATING MNEUMONIC', active: true },
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
          { text: '1. GENERATING MNEUMONIC' },
          { text: '2. VALIDATING', active: true },
          { text: '3. FINISH' },
        ],
        title: 'CREATE NEW VAULT',
        homeUrl: GUEST_HOME_URL,
      },
    },
    {
      path: '/vaultcreated',
      name: 'vaultcreated',
      component: VaultCreation,
      // component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
      meta: {
        requiresAuth: true,
        breadcrumb: [
          { text: '1. GENERATING MNEUMONIC' },
          { text: '2. VALIDATING' },
          { text: '3. FINISH', active: true },
        ],
        title: 'CREATE NEW VAULT',
        homeUrl: GUEST_HOME_URL,
      },
    },
    {
      path: '/vault/dids',
      name: 'dids',
      component: DIDs,
      meta: {
        requiresAuth: true,
        breadcrumb: [],
        title: 'VAULT / DIDs',
        homeUrl: SIGNED_IN_HOME_URL,
        topBarButton: TopCreateNewDIDButton,
      },
    },
    {
      path: '/vault/dids/:id',
      name: 'did',
      params: {
        id: '',
      },
      component: ViewDID,
      meta: {
        requiresAuth: true,
        title: 'VAULT / DIDs / ',
        homeUrl: SIGNED_IN_HOME_URL,
      },
    },
    {
      path: '/vault/claims/create',
      name: 'createclaim',
      component: CreateClaim,
      meta: {
        requiresAuth: true,
        title: 'VAULT / CLAIMS / CREATE NEW',
        homeUrl: SIGNED_IN_HOME_URL,
      },
    },
    {
      path: '/vault/claims',
      name: 'listclaims',
      component: ListClaims,
      meta: {
        requiresAuth: true,
        title: 'VAULT / CLAIMS',
        homeUrl: SIGNED_IN_HOME_URL,
        topBarButton: TopCreateNewClaimButton,
      },
    },
    {
      path: '/vault/claims/:id',
      name: 'viewclaim',
      component: ViewClaim,
      meta: {
        requiresAuth: true,
        title: 'VAULT / CLAIMS / ',
        homeUrl: SIGNED_IN_HOME_URL,
      },
    },
  ],
});
