<template>
  <nav class="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-4"
       :class="scrolled ? 'nav-scrolled' : 'nav-top'">
    <router-link to="/" class="font-syne font-extrabold text-lg text-accent tracking-tight">LARA.</router-link>

    <!-- Desktop links -->
    <ul class="hidden md:flex gap-10 list-none">
      <li v-for="link in links" :key="link.to">
        <router-link :to="link.to"
          class="text-xs font-medium tracking-widest uppercase text-muted hover:text-white transition-colors relative group">
          {{ link.label }}
          <span class="absolute -bottom-1 left-0 right-0 h-px bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
        </router-link>
      </li>
    </ul>

    <!-- Mobile menu button -->
    <button @click="menuOpen = !menuOpen"
            class="md:hidden text-muted hover:text-white p-2"
            aria-label="Menu">
      <svg v-if="!menuOpen" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
      <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
  </nav>

  <!-- Mobile menu -->
  <transition name="slide-down">
    <div v-if="menuOpen" class="fixed top-[64px] left-0 right-0 bg-surface border-b border-[var(--border)] z-40 md:hidden">
      <ul class="flex flex-col py-4">
        <li v-for="link in links" :key="link.to">
          <router-link :to="link.to" @click="menuOpen = false"
            class="block px-8 py-3 text-sm text-muted hover:text-white hover:bg-[var(--glow)] transition-colors">
            {{ link.label }}
          </router-link>
        </li>
      </ul>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const scrolled  = ref(false)
const menuOpen  = ref(false)

const links = [
  { to: '/#about',      label: 'À propos' },
  { to: '/#skills',     label: 'Compétences' },
  { to: '/#experience', label: 'Expérience' },
  { to: '/projects',    label: 'Projets' },
  { to: '/#contact',    label: 'Contact' },
]

const onScroll = () => { scrolled.value = window.scrollY > 20 }
onMounted(()  => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.nav-top     { background: transparent; border-bottom: 1px solid transparent; }
.nav-scrolled { background: rgba(10,10,15,0.85); backdrop-filter: blur(16px); border-bottom: 1px solid var(--border); }
.slide-down-enter-active, .slide-down-leave-active { transition: all 0.25s ease; }
.slide-down-enter-from, .slide-down-leave-to { opacity: 0; transform: translateY(-10px); }
</style>
