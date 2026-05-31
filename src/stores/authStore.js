import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('admin_token') || null)
  const admin = ref(null)

  const isAuthenticated = computed(() => !!token.value)

  async function login(email, password) {
    const { data } = await api.post('/auth/login', { email, password })
    token.value = data.token
    admin.value = data.admin
    localStorage.setItem('admin_token', data.token)
  }

  async function checkAuth() {
    if (!token.value) return false
    try {
      const { data } = await api.get('/auth/me')
      admin.value = data.admin
      return true
    } catch {
      logout()
      return false
    }
  }

  function logout() {
    token.value = null
    admin.value = null
    localStorage.removeItem('admin_token')
  }

  return { token, admin, isAuthenticated, login, checkAuth, logout }
})
