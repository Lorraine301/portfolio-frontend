<template>
  <nav class="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-4"
       :class="scrolled ? 'nav-scrolled' : 'nav-top'">

       <!-- Barre de progression de lecture -->
    <div class="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-accent via-accent3 to-accent2 z-[60] transition-all duration-100"
     :style="`width: ${scrollProgress}%`" />
    <router-link to="/" class="font-syne font-extrabold text-lg text-accent tracking-tight">LARA.</router-link>

    <!-- Desktop links -->
    <ul class="hidden md:flex gap-10 list-none items-center">
      <li v-for="link in links" :key="link.label">
        <button v-if="!link.cta" @click="navigate(link)"
          class="text-xs font-medium tracking-widest uppercase text-muted hover:text-white transition-colors relative group bg-transparent border-none cursor-pointer">
          {{ link.label }}
          <span class="absolute -bottom-1 left-0 right-0 h-px bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
        </button>
        <button v-else @click="navigate(link)"
          class="text-xs font-medium tracking-widest uppercase px-4 py-2 rounded-lg bg-accent text-white hover:bg-accent/80 transition-colors border-none cursor-pointer">
          {{ link.label }}
        </button>
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
        <li v-for="link in links" :key="link.label">
          <button @click="navigate(link)"
            class="block w-full text-left px-8 py-3 text-sm text-muted hover:text-white hover:bg-[var(--glow)] transition-colors bg-transparent border-none cursor-pointer"
            :class="link.cta ? 'text-accent font-semibold' : ''">
            {{ link.label }}
          </button>
        </li>
      </ul>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router   = useRouter()
const route    = useRoute()
const scrolled = ref(false)
const menuOpen = ref(false)

const links = [
  { to: '/', hash: '',           label: 'À propos',    cta: false },
  { to: '/', hash: 'skills',     label: 'Compétences', cta: false },
  { to: '/', hash: 'experience', label: 'Expérience',  cta: false },
  { to: '/projects', hash: '',   label: 'Projets',     cta: false },
  { to: '/', hash: 'contact',    label: 'Contact',     cta: true  },
]

const navigate = async (link) => {
  menuOpen.value = false
  if (link.hash) {
    if (route.path !== '/') {
      await router.push('/')
      await new Promise(r => setTimeout(r, 300))
    }
    document.getElementById(link.hash)?.scrollIntoView({ behavior: 'smooth' })
  } else {
    router.push(link.to)
  }
}
const scrollProgress = ref(0)

const onScroll = () => {
  scrolled.value = window.scrollY > 20
  const doc = document.documentElement
  scrollProgress.value = (doc.scrollTop / (doc.scrollHeight - doc.clientHeight)) * 100
}
onMounted(()  => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.nav-top      { background: transparent; border-bottom: 1px solid transparent; }
.nav-scrolled { background: rgba(10,10,15,0.85); backdrop-filter: blur(16px); border-bottom: 1px solid var(--border); }
.slide-down-enter-active, .slide-down-leave-active { transition: all 0.25s ease; }
.slide-down-enter-from, .slide-down-leave-to { opacity: 0; transform: translateY(-10px); }
</style>