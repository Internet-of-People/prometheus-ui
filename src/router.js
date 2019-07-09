import Vue from 'vue';
import Router from 'vue-router';
import Introduction from '@/views/Introduction.vue';
import CreateNewVault from '@/views/CreateNewVault.vue';
import ValidateVault from '@/views/ValidateVault.vue';
import VaultCreation from '@/views/VaultCreation.vue';
import DIDs from '@/views/DIDs.vue';
import ViewDID from '@/views/ViewDID.vue';
import CreateClaim from '@/views/claim/CreateClaim.vue';
import ListClaims from '@/views/claim/ListClaims.vue';

Vue.use(Router);

const SIGNED_IN_HOME_URL = '/vault/dids';
const GUEST_HOME_URL = '/';

// TODO: we don't need all properties here...
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
        // TODO: split as different component
        topBarButton: {
          name: 'CREATE NEW ID', apiCall: 'createDID',
        },
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
      },
    },
  ],
});
