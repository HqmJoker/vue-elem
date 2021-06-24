import { createRouter, createWebHashHistory } from 'vue-router'
import App from '@/App.vue'

const routes = [
  {
    path: '/location',
    name: 'Location',
    component: () => import('@/views/location/index.vue')
  },
  {
    path: '/city',
    name: 'City',
    component: () => import('@/views/city/index.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue')
  },
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home/index.vue'),
    chlidren: []
  },
  { path: '/:chapters*', redirect: '/' },
]

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes,
})

export default router