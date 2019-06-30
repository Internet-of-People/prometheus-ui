import Vue from 'vue';
import Router from 'vue-router';
import Introduction from '@/views/Introduction.vue';
import CreateNewVault from '@/views/CreateNewVault.vue';
import ValidateVault from '@/views/ValidateVault.vue';
import VaultCreation from '@/views/VaultCreation.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/introduction',
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
          { text: 'GENERATING MNEUMONIC' },
          { text: 'VALIDATING', to: 'validateVault' },
          { text: 'FINISH', to: '' },
        ],
        title: 'CREATE NEW VAULT',
      },
    },
    {
      path: '/validatevault',
      name: 'validateVault',
      component: ValidateVault,
      meta: {
        requiresAuth: false,
        breadcrumb: [
          { text: 'GENERATING MNEUMONIC', to: 'createnewvault' },
          { text: 'VALIDATING' },
          { text: 'FINISH', to: '' },
        ],
        title: 'CREATE NEW VAULT',
      },
    },
    {
      path: '/',
      name: 'vaultcreated',
      component: VaultCreation,
      // component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
      meta: {
        requiresAuth: true,
        breadcrumb: [
          { text: 'VAULT/IDs', to: 'vaultcreated' },
        ],
        title: 'VAULT/ID',
      },
    },
  ],
});
