<template>
  <div>
    <!-- Filters -->
    <div v-if="showFilters" class="flex gap-2 flex-wrap mb-8">
      <button v-for="cat in categories" :key="cat"
              @click="activeFilter = cat"
              class="text-xs font-semibold px-4 py-2 rounded-full border transition-all"
              :class="activeFilter === cat
                ? 'bg-accent border-accent text-white'
                : 'border-[var(--border)] text-muted hover:border-accent hover:text-white'">
        {{ cat }}
      </button>
    </div>

    <!-- Loading skeleton -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div v-for="n in 6" :key="n" class="card p-6 animate-pulse">
        <div class="h-3 w-16 bg-white/5 rounded mb-4" />
        <div class="h-5 w-40 bg-white/5 rounded mb-3" />
        <div class="h-3 w-full bg-white/5 rounded mb-1" />
        <div class="h-3 w-3/4 bg-white/5 rounded mb-6" />
        <div class="flex gap-2"><div class="h-5 w-14 bg-white/5 rounded-full"/><div class="h-5 w-14 bg-white/5 rounded-full"/></div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-else-if="filtered.length === 0" class="text-center py-20 text-muted">
      <svg class="w-12 h-12 mx-auto mb-4 opacity-30" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
        <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
      </svg>
      <p>Aucun projet dans cette catégorie.</p>
    </div>

    <!-- Projects grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div v-for="(project, i) in filtered" :key="project._id"
          class="card p-6 relative overflow-hidden group hover:-translate-y-1.5 transition-transform cursor-default reveal"
          :style="`transition-delay: ${i * 60}ms`"
          :ref="el => observeReveal(el)">
        <!-- Top gradient bar on hover -->
        <div class="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent to-accent3
                    scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-400" />

        <!-- Image -->
        <div v-if="project.imageUrl" class="w-full h-36 rounded-xl overflow-hidden mb-4">
          <img :src="project.imageUrl" :alt="project.title" class="w-full h-full object-cover" />
        </div>

        <div class="text-muted text-xs font-semibold tracking-widest uppercase mb-2">
          {{ String(i + 1).padStart(2, '0') }} — {{ project.category }}
        </div>
        <h3 class="font-syne font-bold text-base mb-2 leading-snug">{{ project.title }}</h3>
        <p class="text-muted text-sm leading-relaxed mb-4 line-clamp-3">{{ project.description }}</p>

        <div class="flex flex-wrap gap-1.5 mb-4">
          <span v-for="tech in project.technologies" :key="tech"
                class="text-[10px] font-semibold px-2 py-0.5 rounded-md
                       bg-accent/10 border border-accent/25 text-accent">
            {{ tech }}
          </span>
        </div>

        <!-- Links -->
        <div class="flex gap-3">
          <a v-if="project.githubUrl" :href="project.githubUrl" target="_blank"
             class="text-muted hover:text-white transition-colors text-xs flex items-center gap-1">
            <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.4.6.1.82-.26.82-.58v-2c-3.34.72-4.04-1.6-4.04-1.6-.54-1.38-1.33-1.74-1.33-1.74-1.08-.74.08-.73.08-.73 1.2.08 1.83 1.23 1.83 1.23 1.06 1.82 2.78 1.3 3.46.99.1-.77.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </a>
          <a v-if="project.liveUrl" :href="project.liveUrl" target="_blank"
             class="text-accent hover:text-white transition-colors text-xs flex items-center gap-1">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
            </svg>
            Live
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  projects:    { type: Array,   default: () => [] },
  loading:     { type: Boolean, default: false },
  showFilters: { type: Boolean, default: false },
})

const activeFilter = ref('Tous')

const observeReveal = (el) => {
  if (!el) return
  const obs = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) { el.classList.add('revealed'); obs.disconnect() }
  }, { threshold: 0.08 })
  obs.observe(el)
}

const categories = computed(() => {
  const cats = [...new Set(props.projects.map((p) => p.category))]
  return ['Tous', ...cats]
})

const filtered = computed(() =>
  activeFilter.value === 'Tous'
    ? props.projects
    : props.projects.filter((p) => p.category === activeFilter.value)
)
</script>
