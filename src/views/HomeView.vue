<template>
  <main>
    <HeroSection />

    <!-- About -->
    <section id="about" class="py-24 px-8 md:px-16">
      <span class="section-label">À propos</span>
      <h2 class="section-title">Qui suis-je ?</h2>
      <p class="section-sub">Étudiante curieuse et motivée, je combine expertise technique et créativité pour construire des solutions innovantes.</p>

      <div class="grid md:grid-cols-2 gap-12 items-start">
        <div>
          <p class="text-muted leading-relaxed mb-5">
            Étudiante en 2ème année du cycle ingénieur à la FST de Tanger, filière Logiciels et Systèmes Intelligents.
            Je suis à la recherche d'un stage PFA en IA, Data Engineering &amp; Développement Logiciel pour mettre en pratique mes connaissances.
          </p>
          <p class="text-muted leading-relaxed mb-8">
            Passionnée par les nouvelles technologies, je m'investis dans des projets concrets allant de l'intelligence artificielle
            au développement web full-stack, en passant par la blockchain et la cybersécurité.
          </p>
          <!-- Stats -->
          <div class="grid grid-cols-2 gap-4">
            <div v-for="stat in stats" :key="stat.label"
                 class="card p-5 hover:-translate-y-1 transition-transform">
              <div class="font-syne font-extrabold text-3xl text-accent leading-none">{{ stat.num }}</div>
              <div class="text-muted text-xs mt-1">{{ stat.label }}</div>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-4">
         <div v-for="info in infos" :key="info.title" class="card p-5">
          <div class="flex items-center gap-2 mb-2">
            <span class="text-accent3" v-html="info.icon"></span>
            <h4 class="text-accent3 text-xs font-bold tracking-widest uppercase">{{ info.title }}</h4>
          </div>
          <p class="text-muted text-sm leading-relaxed">{{ info.content }}</p>
        </div>
        </div>
      </div>
    </section>

    <SkillsSection />
    <ExperienceSection />

    <!-- Featured projects preview -->
    <section class="py-24 px-8 md:px-16">
      <div class="flex items-end justify-between mb-12">
        <div>
          <span class="section-label">Réalisations</span>
          <h2 class="section-title mb-0">Projets phares</h2>
        </div>
        <router-link to="/projects" class="btn btn-outline text-sm">
          Voir tous →
        </router-link>
      </div>
      <ProjectsGrid :projects="featuredProjects" :loading="projectStore.loading" />
    </section>

    <ContactSection />
  </main>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import HeroSection      from '@/components/sections/HeroSection.vue'
import SkillsSection    from '@/components/sections/SkillsSection.vue'
import ExperienceSection from '@/components/sections/ExperienceSection.vue'
import ProjectsGrid     from '@/components/sections/ProjectsGrid.vue'
import ContactSection   from '@/components/sections/ContactSection.vue'
import { useProjectStore }   from '@/stores/projectStore'
import { usePortfolioStore } from '@/stores/portfolioStore'

const projectStore   = useProjectStore()
const portfolioStore = usePortfolioStore()

const featuredProjects = computed(() =>
  projectStore.projects.filter((p) => p.featured).slice(0, 3)
)

onMounted(() => {
  projectStore.fetchProjects()
  portfolioStore.fetchAll()
})

const stats = [
  { num: '8+',  label: 'Projets réalisés' },
  { num: '5+',  label: 'Technologies maîtrisées' },
  { num: '3',   label: 'Langues parlées' },
  { num: '2026', label: 'En recherche de stage' },
]

const infos = [
  { 
    title: 'Formation', 
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M12 14l9-5-9-5-9 5 9 5zm0 7V9m-7 4l7 8 7-8"/></svg>`,
    content: 'Cycle Ingénieur — Logiciels & Systèmes Intelligents · FST Tanger' 
  },
  { 
    title: 'Langues', 
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/></svg>`,
    content: 'Français (natif) · Anglais (intermédiaire) · Arabe (base)' 
  },
  { 
    title: 'Qualités', 
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>`,
    content: 'Rigueur · Autonomie · Gestion des priorités · Travail en équipe' 
  },
  { 
    title: 'Centres d\'intérêt', 
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>`,
    content: 'Basketball · Théâtre · Organisation d\'événements · Leadership associatif' 
  },
]
</script>
