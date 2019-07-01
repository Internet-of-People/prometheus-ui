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
      path: '/',
      name: 'intro',
      component: Introduction,
    },
    {
      path: '/createnewvault',
      name: 'createNewVault',
      component: CreateNewVault,
      meta: {
        breadcrumb: [
          { text: '1. GENERATING MNEUMONIC' },
          { text: '2. VALIDATING', to: 'validateVault' },
          { text: '3. FINISH', to: 'vaultcreated' },
        ],
      },
    },
    {
      path: '/validatevault',
      name: 'validateVault',
      component: ValidateVault,
      meta: {
        breadcrumb: [
          { text: '1. GENERATING MNEUMONIC', to: 'createnewvault' },
          { text: '2. VALIDATING' },
          { text: '3. FINISH', to: 'vaultcreated' },
        ],
      },
    },
    {
      path: '/vaultcreated',
      name: 'vaultcreated',
      component: VaultCreation,
      // component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
      meta: {
        breadcrumb: [
          { text: '1. GENERATING MNEUMONIC', to: 'createnewvault' },
          { text: '2. VALIDATING', to: 'validateVault' },
          { text: '3. FINISH' },
        ],
      },
    },
  ],
});
