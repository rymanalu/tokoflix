import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home'
import Movie from '@/views/Movie'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/:slug',
      name: 'movie',
      component: Movie,
      props: true
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return {x: 0, y: 0}
  }
})
