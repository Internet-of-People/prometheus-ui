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
          { text: 'GENERATING MNEUMONIC' },
          { text: 'VALIDATING', to: 'validateVault' },
          { text: 'FINISH', to: 'vaultcreated' },
        ],
      },
    },
    {
      path: '/validatevault',
      name: 'validateVault',
      component: ValidateVault,
      meta: {
        breadcrumb: [
          { text: 'GENERATING MNEUMONIC', to: 'createnewvault' },
          { text: 'VALIDATING' },
          { text: 'FINISH', to: 'vaultcreated' },
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
          { text: 'GENERATING MNEUMONIC', to: 'createnewvault' },
          { text: 'VALIDATING', to: 'validateVault' },
          { text: 'FINISH' },
        ],
      },
    },
  ],
});
