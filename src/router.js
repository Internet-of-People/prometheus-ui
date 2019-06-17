import Vue from 'vue'
import Router from 'vue-router'
import Introduction from '@/components/startup/Introduction'
import CreateNewVault from '@/components/startup/CreateNewVault'
import ValidateVault from '@/components/startup/ValidateVault'
// import ClaimsPage from '@/components/claims/ClaimsPage'
// import ClaimsNew from '@/components/claims/ClaimsNew'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'intro',
      component: Introduction
    },
    {
      path: '/createnewvault',
      name: 'createNewVault',
      component: CreateNewVault,
      meta: {
        breadcrumb: [
          { name: 'CREATE NEW VAULT' }
        ]
      }
    },
    {
      path: '/validatevault',
      name: 'validateVault',
      component: ValidateVault,
      meta: {
        breadcrumb: [
          { name: 'CREATE NEW VAULT', link: 'createnewvault' },
          { name: 'VALIDATING' }
        ]
      }
    },
    // {
    //   path: '/claims',
    //   name: 'Claims',
    //   component: ClaimsPage,
    //   meta: {
    //     breadcrumb: [
    //       { name: 'Claims' }
    //     ]
    //   }
    // },
    // {
    //   path: '/claims?:filter',
    //   name: 'claimsfiltered',
    //   component: ClaimsPage
    // },
    // {
    //   path: '/claimsnew',
    //   name: 'NewClaims',
    //   component: ClaimsNew,
    //   meta: {
    //     breadcrumb: [
    //       { name: 'Claims', link: 'claims' },
    //       { name: 'New Claims' }
    //     ]
    //   }
    // }
  ]
})
