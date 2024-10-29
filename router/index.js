import { createRouter, createWebHistory } from 'vue-router'
import CharacterPage from '../components/CharacterPage.vue'

const routes = [
  {
    path: '/character/:id',
    name: 'character',
    component: CharacterPage
  },
  // Add more routes here
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
