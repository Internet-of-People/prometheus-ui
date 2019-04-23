import Vue from 'vue'
import Router from 'vue-router'
import Overview from './components/overview/ProfileList'
import Profile from './components/overview/Profile'
import ProfileStudent from './components/overview/ProfileStudent'
import Register from './components/register/Register'
import ClaimsPage from './components/claims/ClaimsPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Overview
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },    
    {
      path: '/profilestudent',
      name: 'profilestudent',
      component: ProfileStudent
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/claims',
      name: 'claims',
      component: ClaimsPage
    },
    {
      path: '/claims/:filter',
      name: 'claimsfiltered', // cant name filtered list the same; gives duplicate errors
      component: ClaimsPage
    },
  ]
})
