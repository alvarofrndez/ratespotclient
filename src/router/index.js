import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/main.vue'),
      children: [
        { path: '', name:'home', component: () => import('@/views/HomeView.vue') },
      ]
    },
    {
      path: '/spots',
      component: () => import('@/layouts/main.vue'),
      children: [
        { path: '', name:'spots', component: () => import('@/views/SpotsView.vue') },
      ]
    },
    {
      path: '/spots/:id',
      component: () => import('@/layouts/main.vue'),
      children: [
        { path: '', name:'spot_id', component: () => import('@/views/SpotDetailView.vue')}
      ]
    },
    {
      path: '/profile',
      component: () => import('@/layouts/main.vue'),
      children: [
        { path: '', name:'profile', component: () => import('@/views/ProfileView.vue') },
      ]
    }
  ],
})

export default router
