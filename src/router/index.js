import Vue from 'vue'
import Router from 'vue-router'

// Routes
// import githubRoutes from './github'

// Layouts
import Layout from '../views/layout/index'
import Page404 from '../views/layout/404'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'main',
      component: Layout,
    },
    {
      path: '/404',
      name: 'page404',
      component: Page404
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})

export default router
