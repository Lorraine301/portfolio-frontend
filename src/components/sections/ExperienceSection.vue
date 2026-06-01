<template>
  <section id="experience" class="py-24 px-8 md:px-16">
    <span class="section-label">Parcours</span>
    <h2 class="section-title">Expérience &amp; Formation</h2>
    <p class="section-sub">Mon parcours professionnel et académique.</p>

    <!-- Skeleton -->
    <div v-if="store.loading" class="grid md:grid-cols-3 gap-8">
      <div v-for="col in 3" :key="col" class="space-y-4">
        <div v-for="n in 2" :key="n" class="card p-6 animate-pulse">
          <div class="h-3 w-24 bg-white/10 rounded mb-3"/>
          <div class="h-5 w-48 bg-white/10 rounded mb-2"/>
          <div class="h-3 w-32 bg-white/10 rounded"/>
        </div>
      </div>
    </div>

    <div v-else class="grid md:grid-cols-3 gap-8">

      <!-- Colonne Formation -->
      <div>
        <div class="flex items-center gap-2 mb-6">
          <svg class="w-4 h-4 text-accent3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M12 14l9-5-9-5-9 5 9 5zm0 7V9m-7 4l7 8 7-8"/>
          </svg>
          <h3 class="font-syne font-bold text-sm tracking-widest uppercase text-accent3">Formation</h3>
        </div>
        <div class="space-y-4">
          <div v-for="(exp, i) in education" :key="exp._id"
               class="card p-5 opacity-0 translate-y-4 transition-all duration-500"
               :ref="el => observeItem(el, i)">
            <div class="text-accent2 text-xs font-semibold tracking-widest uppercase mb-1">
              {{ exp.startDate }}{{ exp.endDate && exp.endDate !== exp.startDate ? ' – ' + exp.endDate : '' }}
            </div>
            <h4 class="font-syne font-bold text-sm mb-1">{{ exp.title }}</h4>
            <div class="text-accent3 text-xs mb-2">{{ exp.organization }}{{ exp.location ? ' · ' + exp.location : '' }}</div>
            <p v-if="exp.description" class="text-muted text-xs leading-relaxed">{{ exp.description }}</p>
          </div>
          <p v-if="!education.length" class="text-muted text-xs">Aucune formation renseignée.</p>
        </div>
      </div>

      <!-- Colonne Professionnel -->
      <div>
        <div class="flex items-center gap-2 mb-6">
          <svg class="w-4 h-4 text-accent" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
          <h3 class="font-syne font-bold text-sm tracking-widest uppercase text-accent">Professionnel</h3>
        </div>
        <div class="space-y-4">
          <div v-for="(exp, i) in professional" :key="exp._id"
               class="card p-5 opacity-0 translate-y-4 transition-all duration-500"
               :ref="el => observeItem(el, i)">
            <div class="text-accent2 text-xs font-semibold tracking-widest uppercase mb-1">
              {{ exp.startDate }}{{ exp.endDate && exp.endDate !== exp.startDate ? ' – ' + exp.endDate : '' }}
            </div>
            <h4 class="font-syne font-bold text-sm mb-1">{{ exp.title }}</h4>
            <div class="text-accent text-xs mb-2">{{ exp.organization }}{{ exp.location ? ' · ' + exp.location : '' }}</div>
            <p v-if="exp.description" class="text-muted text-xs leading-relaxed">{{ exp.description }}</p>
          </div>
          <p v-if="!professional.length" class="text-muted text-xs">Aucune expérience renseignée.</p>
        </div>
      </div>

      <!-- Colonne Associatif -->
      <div>
        <div class="flex items-center gap-2 mb-6">
          <svg class="w-4 h-4 text-accent2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          <h3 class="font-syne font-bold text-sm tracking-widest uppercase text-accent2">Associatif</h3>
        </div>
        <div class="space-y-4">
          <div v-for="(exp, i) in association" :key="exp._id"
               class="card p-5 opacity-0 translate-y-4 transition-all duration-500"
               :ref="el => observeItem(el, i)">
            <div class="text-accent2 text-xs font-semibold tracking-widest uppercase mb-1">
              {{ exp.startDate }}{{ exp.endDate && exp.endDate !== exp.startDate ? ' – ' + exp.endDate : '' }}
            </div>
            <h4 class="font-syne font-bold text-sm mb-1">{{ exp.title }}</h4>
            <div class="text-accent2 text-xs mb-2">{{ exp.organization }}{{ exp.location ? ' · ' + exp.location : '' }}</div>
            <p v-if="exp.description" class="text-muted text-xs leading-relaxed">{{ exp.description }}</p>
          </div>
          <p v-if="!association.length" class="text-muted text-xs">Aucune activité renseignée.</p>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { usePortfolioStore } from '@/stores/portfolioStore'

const store = usePortfolioStore()
onMounted(() => { if (!store.experiences.length) store.fetchExperiences() })

const sortDesc = (arr) => [...arr].sort((a, b) => {
  const year = (s) => parseInt(s?.match(/\d{4}/)?.[0] || '0')
  return year(b.startDate) - year(a.startDate)
})

const education    = computed(() => sortDesc(store.experiences.filter(e => e.type === 'education')))
const professional = computed(() => sortDesc(store.experiences.filter(e => e.type === 'professional')))
const association  = computed(() => sortDesc(store.experiences.filter(e => e.type === 'association')))

const observeItem = (el, i) => {
  if (!el) return
  const obs = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        el.classList.remove('opacity-0', 'translate-y-4')
        el.classList.add('opacity-100', 'translate-y-0')
      }, i * 100)
      obs.disconnect()
    }
  }, { threshold: 0.1 })
  obs.observe(el)
}
</script>