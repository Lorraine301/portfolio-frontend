<template>
  <section id="skills" class="py-24 px-8 md:px-16 bg-surface">
    <span class="section-label">Stack technique</span>
    <h2 class="section-title">Compétences</h2>
    <p class="section-sub">Un ensemble de technologies modernes couvrant le développement full-stack, l'IA, la data et la cybersécurité.</p>

    <div v-if="store.loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div v-for="n in 6" :key="n" class="card p-6 animate-pulse">
        <div class="w-10 h-10 rounded-xl bg-white/5 mb-4" />
        <div class="h-4 w-32 bg-white/5 rounded mb-4" />
        <div class="flex gap-2 flex-wrap">
          <div v-for="i in 4" :key="i" class="h-6 w-16 bg-white/5 rounded-full" />
        </div>
      </div>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div v-for="(skill, i) in store.skills" :key="skill._id"
          class="card p-6 hover:-translate-y-1 transition-transform reveal"
          :style="`transition-delay: ${i * 80}ms`"
          :ref="el => observeReveal(el)">
        <div class="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4"
             :class="`bg-${colorMap[skill.color] || 'accent'}/10`">
          {{ skill.icon }}
        </div>
        <h3 class="font-syne font-bold mb-3">{{ skill.category }}</h3>
        <div class="flex flex-wrap gap-2">
          <span v-for="item in skill.items" :key="item"
                class="tag"
                :class="tagClass(skill.color)">
            {{ item }}
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
onMounted(() => { if (!store.skills.length) store.fetchSkills() })

const colorMap = {
  purple: 'accent',
  teal:   'accent3',
  amber:  'accent2',
  pink:   'pink-400',
  blue:   'blue-400',
  coral:  'orange-400',
}
const observeReveal = (el) => {
  if (!el) return
  const obs = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) { el.classList.add('revealed'); obs.disconnect() }
  }, { threshold: 0.1 })
  obs.observe(el)
}

const tagClass = (color) => ({
  purple: 'text-accent  border-accent/30  bg-accent/5',
  teal:   'text-accent3 border-accent3/30 bg-accent3/5',
  amber:  'text-accent2 border-accent2/30 bg-accent2/5',
  pink:   'text-pink-400  border-pink-400/30  bg-pink-400/5',
  blue:   'text-blue-400  border-blue-400/30  bg-blue-400/5',
  coral:  'text-orange-400 border-orange-400/30 bg-orange-400/5',
}[color] || 'text-accent border-accent/30 bg-accent/5')
</script>
