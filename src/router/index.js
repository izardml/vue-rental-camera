import { createRouter, createWebHistory } from 'vue-router'
import SewaIndex from '@/views/sewa/SewaIndex.vue'
import SewaCreate from '@/views/sewa/SewaCreate.vue'
import SewaList from '@/views/sewa/SewaList.vue'
import SewaEdit from '@/views/sewa/SewaEdit.vue'
import LoginPage from '@/views/login/LoginPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'sewa.index',
      component: SewaIndex
    },
    {
      path: '/camera/:id/detail',
      name: 'sewa.create',
      component: SewaCreate
    },
    {
      path: '/sewa/list',
      name: 'sewa.history',
      component: SewaList
    },
    {
      path: '/sewa/:id/edit',
      name: 'sewa.edit',
      component: SewaEdit
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
  ]
})

export default router
