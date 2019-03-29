import Vue from 'vue'
import Router from 'vue-router'
import MainPage from './components/index'
import AccountsPage from './components/accounts'
import Register from './components/register/register'

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
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})
