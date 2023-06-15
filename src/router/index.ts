import { createRouter, createWebHashHistory } from 'vue-router'


const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/home',
      component: () => import('../views/home.vue')
    },
    {
      path: '/',
      component: () => import('../views/login.vue')
    },
    {
      path: '/main',
      component: () => import('../views/main.vue')
    },
    {
      path: '/setting',
      component: () => import('../views/setting.vue')
    },
  ]
})

export default router
