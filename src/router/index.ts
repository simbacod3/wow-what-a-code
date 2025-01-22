import { createRouter, createWebHistory } from 'vue-router'
import Experiences from '@pages/ExperiencesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'experiences',
      component: Experiences,
    },
  ],
})

export default router
