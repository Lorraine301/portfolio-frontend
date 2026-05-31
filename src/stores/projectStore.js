import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'

export const useProjectStore = defineStore('projects', () => {
  const projects  = ref([])
  const loading   = ref(false)
  const error     = ref(null)

  async function fetchProjects(params = {}) {
    loading.value = true
    error.value   = null
    try {
      const { data } = await api.get('/projects', { params })
      projects.value = data.projects
    } catch (e) {
      error.value = e.response?.data?.message || 'Erreur de chargement'
    } finally {
      loading.value = false
    }
  }

  async function createProject(formData) {
    const { data } = await api.post('/projects', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    projects.value.unshift(data.project)
    return data.project
  }

  async function updateProject(id, formData) {
    const { data } = await api.put(`/projects/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    const idx = projects.value.findIndex((p) => p._id === id)
    if (idx !== -1) projects.value[idx] = data.project
    return data.project
  }

  async function deleteProject(id) {
    await api.delete(`/projects/${id}`)
    projects.value = projects.value.filter((p) => p._id !== id)
  }

  return { projects, loading, error, fetchProjects, createProject, updateProject, deleteProject }
})
