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
      name: 'Intro',
      component: Introduction
    },
    {
      path: '/createnewvault',
      name: 'CreateNewVault',
      component: CreateNewVault,
      meta: {
        breadcrumb: [
          { name: 'GENERATING MNEMONIC' }
        ]
      }
    },
    {
      path: '/validatevault',
      name: 'ValidateVault',
      component: ValidateVault,
      meta: {
        breadcrumb: [
          { name: 'GENERATING MNEMONIC', link: 'createnewvault' },
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
