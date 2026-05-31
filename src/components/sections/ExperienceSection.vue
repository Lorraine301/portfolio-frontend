<template>
  <section id="experience" class="py-24 px-8 md:px-16">
    <span class="section-label">Parcours</span>
    <h2 class="section-title">Expérience &amp; Formation</h2>
    <p class="section-sub">Mon parcours professionnel et académique.</p>

    <div v-if="store.loading" class="space-y-6">
      <div v-for="n in 4" :key="n" class="flex gap-6 animate-pulse">
        <div class="w-12 flex justify-center pt-1"><div class="w-3 h-3 rounded-full bg-white/10" /></div>
        <div class="card flex-1 p-6"><div class="h-3 w-24 bg-white/10 rounded mb-3"/><div class="h-5 w-48 bg-white/10 rounded mb-2"/><div class="h-3 w-32 bg-white/10 rounded"/></div>
      </div>
    </div>

    <div v-else class="relative">
      <!-- Timeline line -->
      <div class="absolute left-5 top-2 bottom-0 w-px bg-gradient-to-b from-accent to-transparent" />

      <div v-for="(exp, i) in store.experiences" :key="exp._id"
           class="flex gap-6 mb-10 opacity-0 translate-x-[-16px] transition-all duration-500"
           :ref="el => observeItem(el, i)">
        <div class="flex justify-center pt-1 w-10 shrink-0">
          <div class="w-3 h-3 rounded-full relative z-10 shadow-[0_0_10px]"
               :class="dotColor(exp.type)" />
        </div>
        <div class="card flex-1 p-6">
          <div class="text-accent2 text-xs font-semibold tracking-widest uppercase mb-1">
            {{ exp.startDate }} {{ exp.endDate && exp.endDate !== exp.startDate ? '– ' + exp.endDate : '' }}
          </div>
          <h3 class="font-syne font-bold text-base mb-1">{{ exp.title }}</h3>
          <div class="text-accent3 text-sm mb-3">{{ exp.organization }}{{ exp.location ? ' · ' + exp.location : '' }}</div>
          <p v-if="exp.description" class="text-muted text-sm leading-relaxed">{{ exp.description }}</p>
          <span class="inline-block mt-3 text-xs font-semibold px-2 py-0.5 rounded-full"
                :class="typeTag(exp.type)">
            {{ typeLabel(exp.type) }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { usePortfolioStore } from '@/stores/portfolioStore'

const store = usePortfolioStore()
onMounted(() => { if (!store.experiences.length) store.fetchExperiences() })

const dotColor = (type) => ({
  professional: 'bg-accent    shadow-accent',
  education:    'bg-accent3   shadow-accent3',
  association:  'bg-accent2   shadow-accent2',
}[type] || 'bg-accent shadow-accent')

const typeLabel = (type) => ({ professional: '💼 Professionnel', education: '🎓 Formation', association: '🤝 Associatif' }[type] || type)
const typeTag   = (type) => ({
  professional: 'bg-accent/10   text-accent',
  education:    'bg-accent3/10  text-accent3',
  association:  'bg-accent2/10  text-accent2',
}[type] || 'bg-accent/10 text-accent')

// Intersection Observer pour animer les items
const observeItem = (el, i) => {
  if (!el) return
  const obs = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        el.classList.remove('opacity-0', 'translate-x-[-16px]')
        el.classList.add('opacity-100', 'translate-x-0')
      }, i * 100)
      obs.disconnect()
    }
  }, { threshold: 0.1 })
  obs.observe(el)
}
</script>
