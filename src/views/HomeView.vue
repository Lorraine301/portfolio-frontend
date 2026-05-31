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
            <h4 class="text-accent3 text-xs font-bold tracking-widest uppercase mb-2">{{ info.title }}</h4>
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
  { num: '2025', label: 'En recherche de stage' },
]

const infos = [
  { title: '🎓 Formation',        content: 'Cycle Ingénieur — Logiciels & Systèmes Intelligents · FST Tanger' },
  { title: '🌍 Langues',          content: 'Français (natif) · Anglais (intermédiaire) · Arabe (base)' },
  { title: '🏆 Qualités',         content: 'Rigueur · Autonomie · Gestion des priorités · Travail en équipe' },
  { title: '🎭 Centres d\'intérêt', content: 'Basketball · Théâtre · Organisation d\'événements · Leadership associatif' },
]
</script>
