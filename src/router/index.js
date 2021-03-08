import Vue from 'vue'
import Router from 'vue-router'

// Pages
import Profile from '../views/pages/profile'
import Dashboard from '../views/pages/dashboard'
import Page404 from '../views/pages/error'

import Layout from '../views/layout'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      component: Layout,
      children: [
        {
          path: '',
          name: 'dashboard',
          component: Dashboard
        },
        {
          path: 'user/:login',
          name: 'profile',
          component: Profile
        },
        {
          path: '404',
          component: Page404
        },
        {
          path: '*',
          redirect: '404'
        },
      ]
    },
  ]
})

export default router
