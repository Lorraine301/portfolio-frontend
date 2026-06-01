<template>
  <main>
    <HeroSection />

    <!-- About -->
    <section id="about" class="py-24 px-8 md:px-16">
      <span class="section-label reveal">À propos</span>
      <h2 class="section-title reveal reveal-delay-1">Qui suis-je ?</h2>
      <p class="section-sub reveal reveal-delay-2">Étudiante curieuse et motivée, je combine expertise technique et créativité pour construire des solutions innovantes.</p>

      <div class="grid md:grid-cols-2 gap-12 items-start">
        <div>
          <p class="text-muted leading-relaxed mb-5 reveal reveal-delay-1">
            Étudiante en 2ème année du cycle ingénieur à la FST de Tanger, filière Logiciels et Systèmes Intelligents.
            Je suis à la recherche d'un <span class="text-accent font-semibold">stage PFA</span> en 
            <span class="text-accent3 font-semibold">IA</span>, 
            <span class="text-accent3 font-semibold">Data Engineering</span> &amp; 
            <span class="text-accent3 font-semibold">Développement Logiciel</span> 
            pour mettre en pratique mes connaissances.
          </p>
          <p class="text-muted leading-relaxed mb-8 reveal reveal-delay-2">
           Passionnée par les nouvelles technologies, je m'investis dans des projets concrets couvrant un large spectre : de l'intelligence artificielle et du Big Data au développement logiciel et web full-stack.
          </p>
         <div class="grid grid-cols-2 gap-4">
            <component
              :is="stat.link ? 'button' : 'div'"
              v-for="(stat, i) in stats" :key="stat.label"
              class="card p-5 hover:-translate-y-1 transition-transform reveal text-left"
              :class="stat.link ? 'cursor-pointer hover:border-accent/50 border border-transparent transition-colors' : ''"
              :style="`transition-delay: ${i * 80}ms`"
              @click="stat.link ? navigateStat(stat.link) : null">
              <div class="font-syne font-extrabold text-3xl text-accent leading-none">{{ stat.num }}</div>
              <div class="text-muted text-xs mt-1 flex items-center gap-1">
                {{ stat.label }}
                <svg v-if="stat.link" class="w-3 h-3 opacity-50" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </component>
          </div>
        </div>

        <div class="flex flex-col gap-4">
          <div v-for="(info, i) in infos" :key="info.title"
               class="card p-5 reveal"
               :style="`transition-delay: ${i * 100}ms`">
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

    <!-- Featured projects -->
    <section class="py-24 px-8 md:px-16">
      <div class="flex items-end justify-between mb-12">
        <div>
          <span class="section-label reveal">Réalisations</span>
          <h2 class="section-title mb-0 reveal reveal-delay-1">Projets phares</h2>
        </div>
        <router-link to="/projects" class="btn btn-outline text-sm reveal reveal-delay-2">
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
import HeroSection       from '@/components/sections/HeroSection.vue'
import SkillsSection     from '@/components/sections/SkillsSection.vue'
import ExperienceSection from '@/components/sections/ExperienceSection.vue'
import ProjectsGrid      from '@/components/sections/ProjectsGrid.vue'
import ContactSection    from '@/components/sections/ContactSection.vue'
import { useProjectStore }   from '@/stores/projectStore'
import { usePortfolioStore } from '@/stores/portfolioStore'
import { useRouter } from 'vue-router'

const projectStore   = useProjectStore()
const portfolioStore = usePortfolioStore()
const router = useRouter()

const featuredProjects = computed(() =>
  projectStore.projects.filter((p) => p.featured).slice(0, 3)
)

onMounted(() => {
  projectStore.fetchProjects()
  portfolioStore.fetchAll()

  // Scroll reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.12 })

  setTimeout(() => {
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
  }, 100)
})

const navigateStat = (link) => {
  if (link.startsWith('#')) {
    document.getElementById(link.slice(1))?.scrollIntoView({ behavior: 'smooth' })
  } else {
    router.push(link)
  }
}
const stats = [
  { num: '8+',   label: 'Projets réalisés',        link: '/projects' },
  { num: '20+',  label: 'Technologies maîtrisées',  link: '#skills'   },
  { num: '3',    label: 'Langues parlées',           link: null        },
  { num: '2026', label: 'En recherche de stage',     link: '#contact'  },
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

<style scoped>
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}
.reveal-delay-1 { transition-delay: 100ms; }
.reveal-delay-2 { transition-delay: 200ms; }
</style>