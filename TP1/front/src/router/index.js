import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import UserList from '../components/UserList.vue'; 

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/users',
    name: 'UserList',
    component: UserList 
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
