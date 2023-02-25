import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {store} from '@/main'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/playground',
    name: 'Play Ground',
    component: () => import('../views/HamsterPlayGround.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
    beforeEnter: (to, from, next)=> {
      if(store.getters['auth/isLoggedIn']){
        next('/')
      }else{
        next()
      }
    }
  },
  {
    path: '/gamebuilder',
    name: "Builder",
    component: () => import('../views/GameBuilder.vue'),
    meta: {requiresAuth: true}
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach ((to, from, next) => {
  if(to.meta.requiresAuth && !store.getters['auth/isLoggedIn']){
    next('/login')
  } else {
    next()
  }
})



export default router
