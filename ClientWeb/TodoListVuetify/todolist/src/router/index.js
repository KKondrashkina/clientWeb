import Vue from 'vue'
import VueRouter from 'vue-router'
import TodoLists from '../components/todoLists/TodoListsContainer.vue'
import Notes from '../components/notes/NotesContainer.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/todoLists',
    name: 'TodoLists',
    component: TodoLists
  },
  {
    path: '/notes',
    name: 'Notes',
    component: Notes
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
