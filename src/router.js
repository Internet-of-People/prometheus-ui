import Vue from 'vue'
import Router from 'vue-router'
import ClaimsPage from '@/components/claims/ClaimsPage'
import ClaimsNew from '@/components/claims/ClaimsNew'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/claims',
      name: 'Claims',
      component: ClaimsPage,
      meta: {
        breadcrumb: [
          { name: 'Claims' }
        ]
      }
    },
    {
      path: '/claims?:filter',
      name: 'claimsfiltered',
      component: ClaimsPage
    },
    {
      path: '/claimsnew',
      name: 'NewClaims',
      component: ClaimsNew,
      meta: {
        breadcrumb: [
          { name: 'Claims', link: 'claims' },
          { name: 'New Claims' }
        ]
      }
    }
  ]
})
