import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const routes = [
  {
    path: '/',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: 'Lorraine Agnès — Portfolio' },
  },
  {
    path: '/projects',
    component: () => import('@/views/ProjectsView.vue'),
    meta: { title: 'Projets — Lorraine Agnès' },
  },
  {
    path: '/admin/login',
    component: () => import('@/views/admin/LoginView.vue'),
    meta: { title: 'Connexion Admin', guestOnly: true },
  },
  {
    path: '/admin',
    component: () => import('@/views/admin/AdminLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', redirect: '/admin/projects' },
      {
        path: 'projects',
        component: () => import('@/views/admin/AdminProjects.vue'),
        meta: { title: 'Admin — Projets' },
      },
      {
        path: 'experiences',
        component: () => import('@/views/admin/AdminExperiences.vue'),
        meta: { title: 'Admin — Expériences' },
      },
      {
        path: 'skills',
        component: () => import('@/views/admin/AdminSkills.vue'),
        meta: { title: 'Admin — Compétences' },
      },
    ],
  },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0, behavior: 'smooth' }),
})

router.beforeEach(async (to, _from, next) => {
  document.title = to.meta.title || 'Portfolio'

  if (to.meta.requiresAuth) {
    const auth = useAuthStore()
    const ok   = await auth.checkAuth()
    if (!ok) return next('/admin/login')
  }

  if (to.meta.guestOnly) {
    const auth = useAuthStore()
    if (auth.isAuthenticated) return next('/admin')
  }

  next()
})

export default router
