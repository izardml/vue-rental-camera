import { createRouter, createWebHistory } from 'vue-router'
import SewaIndex from '@/views/sewa/SewaIndex.vue'
import SewaHistory from '@/views/sewa/SewaHistory.vue'
import SewaShow from '@/views/sewa/SewaShow.vue'
import CameraShow from '@/views/camera/CameraShow.vue'

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
      name: 'camera.detail',
      component: CameraShow
    },
    {
      path: '/sewa/history',
      name: 'sewa.history',
      component: SewaHistory
    },
    {
      path: '/sewa/:id/detail',
      name: 'sewa.show',
      component: SewaShow
    },
  ]
})

export default router
