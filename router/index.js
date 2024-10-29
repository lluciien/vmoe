import { createRouter, createWebHistory } from 'vue-router'
import CharacterPage from '../components/CharacterPage.vue'
import AuthorPage from '../components/AuthorPage.vue'

const routes = [
  {
    path: '/character/:id',
    name: 'character',
    component: CharacterPage
  },
  {
    path: '/author/:id',
    name: 'author',
    component: AuthorPage
  },
  {
    path: '/',
    redirect: '/character/1'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
