<template>
  <div class="min-h-screen flex bg-bg">
    <!-- Sidebar -->
    <aside class="w-56 shrink-0 bg-surface border-r border-[var(--border)] flex flex-col">
      <div class="p-6 border-b border-[var(--border)]">
        <div class="font-syne font-extrabold text-accent text-xl">LAR.</div>
        <div class="text-muted text-xs mt-1">Panel Admin</div>
      </div>

      <nav class="flex-1 p-4 flex flex-col gap-1">
        <router-link v-for="link in navLinks" :key="link.to" :to="link.to"
          class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
          :class="$route.path === link.to
            ? 'bg-accent/15 text-accent border border-accent/25'
            : 'text-muted hover:text-white hover:bg-white/5'">
          <span>{{ link.icon }}</span>
          {{ link.label }}
        </router-link>
      </nav>

      <div class="p-4 border-t border-[var(--border)]">
        <div class="text-xs text-muted mb-3 px-1 truncate">{{ auth.admin?.email }}</div>
        <button @click="handleLogout"
                class="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-muted
                       hover:text-red-400 hover:bg-red-400/10 transition-all">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
          </svg>
          Déconnexion
        </button>
        <router-link to="/" class="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-muted hover:text-white transition-all mt-1">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          Voir le portfolio
        </router-link>
      </div>
    </aside>

    <!-- Main content -->
    <main class="flex-1 overflow-auto p-8">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const auth   = useAuthStore()
const router = useRouter()

const navLinks = [
  { to: '/admin/projects',    icon: '🗂️', label: 'Projets' },
  { to: '/admin/experiences', icon: '💼', label: 'Expériences' },
  { to: '/admin/skills',      icon: '⚙️', label: 'Compétences' },
]

const handleLogout = () => {
  auth.logout()
  router.push('/admin/login')
}
</script>
