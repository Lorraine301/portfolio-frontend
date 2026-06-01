<template>
  <main class="min-h-screen flex items-center justify-center px-4 bg-bg">
    <div class="w-full max-w-sm">
      <div class="text-center mb-10">
        <div class="font-syne font-extrabold text-3xl text-accent mb-2">LARA.</div>
        <h1 class="font-syne font-bold text-xl mb-1">Espace Admin</h1>
        <p class="text-muted text-sm">Connectez-vous pour gérer votre portfolio</p>
      </div>

      <div class="card p-8">
        <form @submit.prevent="handleLogin" class="flex flex-col gap-5">
          <div>
            <label class="block text-xs font-semibold text-muted mb-2 tracking-wider uppercase">Email</label>
            <input v-model="form.email" type="email" required placeholder="votre@email.com" class="input" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-muted mb-2 tracking-wider uppercase">Mot de passe</label>
            <input v-model="form.password" type="password" required placeholder="••••••••" class="input" />
          </div>

          <p v-if="error" class="text-red-400 text-sm text-center bg-red-400/10 border border-red-400/20 rounded-lg py-2 px-3">
            {{ error }}
          </p>

          <button type="submit" :disabled="loading"
                  class="btn btn-primary justify-center w-full">
            <svg v-if="loading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            {{ loading ? 'Connexion...' : 'Se connecter' }}
          </button>
        </form>
      </div>

      <div class="text-center mt-6">
        <router-link to="/" class="text-muted text-sm hover:text-white transition-colors">
          ← Retour au portfolio
        </router-link>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const auth   = useAuthStore()

const form    = ref({ email: '', password: '' })
const loading = ref(false)
const error   = ref(null)

const handleLogin = async () => {
  loading.value = true
  error.value   = null
  try {
    await auth.login(form.value.email, form.value.password)
    router.push('/admin')
  } catch (e) {
    error.value = e.response?.data?.message || 'Identifiants incorrects'
  } finally {
    loading.value = false
  }
}
</script>
