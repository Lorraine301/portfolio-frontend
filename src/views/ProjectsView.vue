<template>
  <main class="pt-28 pb-24 px-8 md:px-16">
    <span class="section-label">Réalisations</span>
    <h1 class="section-title">Tous mes projets</h1>
    <p class="section-sub">{{ store.projects.length }} projets réalisés dans des domaines variés.</p>

    <ProjectsGrid :projects="store.projects" :loading="store.loading" :show-filters="true" />
  </main>
</template>

<script setup>
import { onMounted } from 'vue'
import ProjectsGrid from '@/components/sections/ProjectsGrid.vue'
import { useProjectStore } from '@/stores/projectStore'

const store = useProjectStore()
onMounted(() => store.fetchProjects())
</script>
