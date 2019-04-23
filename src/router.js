import Vue from 'vue'
import Router from 'vue-router'
import Overview from './components/overview/ProfileList'
import ProfileInfluencer from './components/overview/ProfileInfluencer'
import ProfileStudent from './components/overview/ProfileStudent'
import Profile from './components/overview/Profile'
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
      path: '/profile/student',
      name: 'profilestudent',
      component: ProfileStudent
    },    
    {
      path: '/profile/influencer',
      name: 'profileinfluencer',
      component: ProfileInfluencer
    },
    {
      path: '/profile/:profile_id',
      name: 'profile',
      component: Profile
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
