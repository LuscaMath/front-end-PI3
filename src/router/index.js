import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import PerfilView from '@/views/PerfilView.vue';

const isAuthenticated = () => !!localStorage.getItem('accessToken');

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }, // Protegida
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: PerfilView,
      meta: { requiresAuth: true }, // Protegida
    },
  ],
});

// Navigation Guard para proteger rotas
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next('/'); // Redireciona para login se não estiver autenticado
  } else {
    next(); // Permite a navegação
  }
});

export default router;
