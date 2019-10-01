import Vue from 'vue';
import Router from 'vue-router';
import api from '@/api';
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

Vue.use(Router);

const SIGNED_IN_HOME_URL = '/vault/dids';
const GUEST_HOME_URL = '/';

const router = new Router({
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
      meta: { requiresAuth: false, showProfile: false },
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
        showProfile: false,
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
        showProfile: false,
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
        showProfile: false,
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
        showProfile: true,
      },
    },
    {
      path: '/vault/dids/:did',
      name: 'viewDID',
      component: ViewDID,
      meta: {
        requiresAuth: true,
        title: 'DID Details',
        homeUrl: SIGNED_IN_HOME_URL,
        showProfile: true,
      },
      props: true,
    },
    {
      path: '/vault/claims/create',
      name: 'createClaim',
      component: CreateClaim,
      meta: {
        requiresAuth: true,
        title: 'Vault / Claims / Create New',
        homeUrl: SIGNED_IN_HOME_URL,
        showProfile: true,
      },
      props: true,
    },
    {
      path: '/vault/claims',
      name: 'listClaims',
      component: ListClaims,
      meta: {
        requiresAuth: true,
        title: 'Claims',
        homeUrl: SIGNED_IN_HOME_URL,
        showProfile: true,
      },
    },
    {
      path: '/vault/claims/:id',
      name: 'viewClaim',
      component: ViewClaim,
      meta: {
        requiresAuth: true,
        title: 'Claims Details',
        homeUrl: SIGNED_IN_HOME_URL,
        showProfile: true,
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
        showProfile: true,
      },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  try {
    if (to.meta.requiresAuth) {
      const activeDid = await api.getActiveDIDID();
      if (!activeDid.data) { // no active did is set
        if (to.name !== 'listDIDs' && to.name !== 'vaultCreated') {
          next({ name: 'listDIDs' });
          return;
        }
      }
    }
  } catch (err) {
    if (to.name !== 'intro' && to.name !== null) {
      next({ name: 'intro' });
      return;
    }
  }

  next();
});

export default router;
