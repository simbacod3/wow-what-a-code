import { createRouter, createWebHistory } from 'vue-router'
import Experiences from '@pages/ExperiencesView.vue'
import Welcome from '@pages/WelcomeView.vue'
import DetailsView from '@/views/DetailsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Welcome,
    },
    {
      path: '/discover',
      name: 'experiences',
      component: Experiences,
    },
    {
      path: '/experience/:id',
      name: 'details',
      component: DetailsView,
    },
  ],
})

export default router
