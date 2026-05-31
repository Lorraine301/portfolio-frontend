import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'

export const usePortfolioStore = defineStore('portfolio', () => {
  const skills      = ref([])
  const experiences = ref([])
  const loading     = ref(false)

  async function fetchSkills() {
    const { data } = await api.get('/skills')
    skills.value = data.skills
  }

  async function fetchExperiences() {
    const { data } = await api.get('/experiences')
    experiences.value = data.experiences
  }

  async function fetchAll() {
    loading.value = true
    try {
      await Promise.all([fetchSkills(), fetchExperiences()])
    } finally {
      loading.value = false
    }
  }

  // Skills CRUD
  async function createSkill(payload) {
    const { data } = await api.post('/skills', payload)
    skills.value.push(data.skill)
  }
  async function updateSkill(id, payload) {
    const { data } = await api.put(`/skills/${id}`, payload)
    const idx = skills.value.findIndex((s) => s._id === id)
    if (idx !== -1) skills.value[idx] = data.skill
  }
  async function deleteSkill(id) {
    await api.delete(`/skills/${id}`)
    skills.value = skills.value.filter((s) => s._id !== id)
  }

  // Experiences CRUD
  async function createExperience(payload) {
    const { data } = await api.post('/experiences', payload)
    experiences.value.unshift(data.experience)
  }
  async function updateExperience(id, payload) {
    const { data } = await api.put(`/experiences/${id}`, payload)
    const idx = experiences.value.findIndex((e) => e._id === id)
    if (idx !== -1) experiences.value[idx] = data.experience
  }
  async function deleteExperience(id) {
    await api.delete(`/experiences/${id}`)
    experiences.value = experiences.value.filter((e) => e._id !== id)
  }

  return {
    skills, experiences, loading,
    fetchSkills, fetchExperiences, fetchAll,
    createSkill, updateSkill, deleteSkill,
    createExperience, updateExperience, deleteExperience,
  }
})
