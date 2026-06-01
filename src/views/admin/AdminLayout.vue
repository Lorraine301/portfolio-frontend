<template>
  <div class="min-h-screen flex bg-bg">
    <aside class="w-64 shrink-0 flex flex-col" style="background: #0d0d1a; border-right: 1px solid rgba(124,111,247,0.15);">
      <div class="px-6 py-5 border-b" style="border-color: rgba(124,111,247,0.15);">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center">
            <svg class="w-5 h-5 text-accent" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
          </div>
          <div>
            <div class="font-syne font-extrabold text-white text-base leading-none">LARA.</div>
            <div class="text-[10px] text-muted mt-0.5 tracking-widest uppercase">Panel Admin</div>
          </div>
        </div>
      </div>

      <nav class="flex-1 px-3 py-4 flex flex-col gap-1">
        <p class="text-[10px] text-muted/50 font-semibold tracking-widest uppercase px-3 mb-2">Gestion</p>
        <router-link v-for="link in navLinks" :key="link.to" :to="link.to"
          class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group"
          :class="$route.path === link.to
            ? 'bg-accent/15 text-accent border border-accent/25'
            : 'text-muted hover:text-white hover:bg-white/5'">
          <div class="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
               :class="$route.path === link.to ? 'bg-accent/20' : 'bg-white/5 group-hover:bg-white/10'">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path :d="link.iconPath"/>
            </svg>
          </div>
          {{ link.label }}
          <span v-if="$route.path === link.to" class="ml-auto w-1.5 h-1.5 rounded-full bg-accent" />
        </router-link>
      </nav>

      <div class="px-3 py-4 border-t" style="border-color: rgba(124,111,247,0.15);">
        <div class="flex items-center gap-2 px-3 py-2 mb-1">
          <div class="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center text-xs font-bold text-accent">
            {{ auth.admin?.email?.charAt(0).toUpperCase() }}
          </div>
          <span class="text-xs text-muted truncate flex-1">{{ auth.admin?.email }}</span>
        </div>
        <router-link to="/"
          class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted hover:text-white hover:bg-white/5 transition-all">
          <div class="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </div>
          Voir le portfolio
        </router-link>
        <button @click="handleLogout"
          class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted hover:text-red-400 hover:bg-red-400/10 transition-all">
          <div class="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
            </svg>
          </div>
          Déconnexion
        </button>
      </div>
    </aside>

    <main class="flex-1 overflow-auto">
      <div class="px-8 py-4 border-b flex items-center justify-between sticky top-0 z-10"
           style="background: rgba(10,10,15,0.9); backdrop-filter: blur(12px); border-color: rgba(124,111,247,0.15);">
        <h2 class="font-syne font-bold text-base text-white">{{ currentPageTitle }}</h2>
        <div class="flex items-center gap-2 text-xs text-muted">
          <div class="w-2 h-2 rounded-full bg-accent3 animate-pulse" />
          En ligne
        </div>
      </div>
      <div class="p-8">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter, useRoute } from 'vue-router'

const auth   = useAuthStore()
const router = useRouter()
const route  = useRoute()

const navLinks = [
  {
    to: '/admin/projects',
    label: 'Projets',
    iconPath: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
  },
  {
    to: '/admin/experiences',
    label: 'Expériences',
    iconPath: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  },
  {
    to: '/admin/skills',
    label: 'Compétences',
    iconPath: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
  },
]

const currentPageTitle = computed(() => navLinks.find(l => l.to === route.path)?.label || 'Admin')
const handleLogout = () => { auth.logout(); router.push('/admin/login') }
</script>