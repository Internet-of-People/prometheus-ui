import Vue from 'vue';
import Router from 'vue-router';
import Introduction from '@/views/Introduction';
import CreateNewVault from '@/views/CreateNewVault';
import ValidateVault from '@/views/ValidateVault';
import VaultCreation from '@/views/VaultCreation';

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
          {name: 'GENERATING MNEUMONIC'},
          {name: 'VALIDATING', link: 'validateVault'},
          {name: 'FINISH', link: 'vaultcreated'},
        ]
      }
    },
    {
      path: '/validatevault',
      name: 'validateVault',
      component: ValidateVault,
      meta: {
        breadcrumb: [
          {name: 'GENERATING MNEUMONIC', link: 'createnewvault'},
          {name: 'VALIDATING'},
          {name: 'FINISH', link: 'vaultcreated'},
        ]
      }
    },
    {
      path: '/vaultcreated',
      name: 'vaultcreated',
      component: VaultCreation,
      //component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
      meta: {
        breadcrumb: [
          {name: 'GENERATING MNEUMONIC', link: 'createnewvault'},
          {name: 'VALIDATING', link: 'validateVault'},
          {name: 'FINISH'},
        ]
      }
    },
  ],
});
