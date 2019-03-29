import Vue from 'vue'
import Router from 'vue-router'
import MainPage from './components/index.vue'
import AccountsPage from './components/accounts.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainPage
    },
    {
      path: '/accounts',
      name: 'accounts',
      component: AccountsPage
    }
  ]
})
