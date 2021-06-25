import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  // 选择城市
  {
    path: '/location',
    name: 'Location',
    component: () => import('@/views/location/index.vue')
  },
  // 选择具体位置
  {
    path: '/city',
    name: 'City',
    component: () => import('@/views/city/index.vue')
  },
  // 登录/注册
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue')
  },
  // 根页面
  { path: '/', redirect: '/home' },
  // 首页（外卖）
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home/index.vue'),
  },
  // 搜索
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/search/index.vue'),
  },
  // 订单
  {
    path: '/order',
    name: 'Order',
    component: () => import('@/views/order/index.vue'),
  },
  // 我的
  {
    path: '/my',
    name: 'My',
    component: () => import('@/views/my/index.vue'),
  },
  { path: '/:chapters*', redirect: '/' },
]

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes,
})

export default router