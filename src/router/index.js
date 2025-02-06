import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import PerfilView from '@/views/PerfilView.vue';
import SuporteView from '@/views/SuporteView.vue';
import ProdutoView from '@/views/ProdutoView.vue';
import CarrinhoView from '@/views/CarrinhoView.vue';
import FinalizaCompra from '@/views/FinalizaCompra.vue';
import MinhasComprasView from '@/views/MinhasComprasView.vue';
import GatosView from '@/views/GatosView.vue';
import CachorrosView from '@/views/CachorrosView.vue';
import BuscaView from '@/views/BuscaView.vue';

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
      path: '/busca',
      name: 'busca',
      component: BuscaView,
      meta: { requiresAuth: true }, // Protegida
    },
    {
      path: '/gatos',
      component: GatosView,
      props: true,
      meta: { requiresAuth: true }, // Protegida
    },
    {
      path: '/cachorros',
      component: CachorrosView,
      props: true,
      meta: { requiresAuth: true }, // Protegida
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: PerfilView,
      meta: { requiresAuth: true }, // Protegida
    },
    {
      path: '/suporte',
      name: 'suporte',
      component: SuporteView,
      meta: { requiresAuth: true }, // Protegida
    },
    {
      path: '/produto/:id',
      name: 'produto',
      component: ProdutoView, 
      props: true,
      meta: { requiresAuth: true }, // Protegida
    },
    {
      path: '/carrinho/',
      name: 'carrinho',
      component: CarrinhoView, 
      props: true,
      meta: { requiresAuth: true }, // Protegida
    },
    {
      path: '/finalizaCompra/',
      name: 'finalizaCompra',
      component: FinalizaCompra, 
      props: true,
      meta: { requiresAuth: true }, // Protegida
    },
    {
      path: '/minhasCompras/',
      name: 'minhasCompras',
      component: MinhasComprasView, 
      props: true,
      meta: { requiresAuth: true }, // Protegida
    }
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
