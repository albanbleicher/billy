import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import App from './App'
import store from '@/store/index'
import { getCurrentUser } from '../config'
Vue.use(VueRouter)
const title = 'Billy'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: false,
      title: "L'assistant malin pour les entreprises"
    }
  },
  {
    path: '/auth/register',
    name: 'Register',
    component: () =>
      import(/* webpackChunkName: "Register" */ '../views/Auth/Register.vue'),
    meta: {
      requiresAuth: false,
      title: 'Inscription'
    }
  },
  {
    path: '/auth/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "Login" */ '../views/Auth/Login.vue'),
    meta: {
      requiresAuth: false,
      title: 'Connexion'
    }
  },
  {
    path: '/auth/forget',
    name: 'Forget',
    component: () =>
      import(/* webpackChunkName: "Forget" */ '../views/Auth/Forget.vue'),
    meta: {
      requiresAuth: false,
      title: 'Mot de passe oublié'
    }
  },
  {
    path: '/app',
    name: 'App',
    children: App,
    component: () =>
      import(/* webpackChunkName: "App" */ '../views/App/Layout.vue'),
    meta: {
      requiresAuth: true,
      title: 'Dashboard'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth && !(await getCurrentUser())) {
    next({
      path: '/'
    })
  } else {
    next()
  }
  if (!requiresAuth && (await getCurrentUser())) {
    next({
      path: '/app'
    })
  } else {
    next()
  }
  if (await getCurrentUser()) {
    const user = await getCurrentUser()
    const user_data = {
      email: user.email,
      uid: user.uid
    }
    store.commit('Auth/SET_USER', user_data)
  }
  document.title = title + ' — ' + to.meta.title
})
export default router
