<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="font-syne font-extrabold text-2xl">Expériences</h1>
        <p class="text-muted text-sm mt-1">{{ store.experiences.length }} expérience(s)</p>
      </div>
      <button @click="openForm()" class="btn btn-primary">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
        Ajouter
      </button>
    </div>

    <div class="space-y-3">
      <div v-for="exp in store.experiences" :key="exp._id" class="card p-4 flex items-center gap-4">
        <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          :class="{ 'bg-accent/10': exp.type==='professional', 'bg-accent3/10': exp.type==='education', 'bg-accent2/10': exp.type==='association' }">
        <svg class="w-5 h-5" :class="{ 'text-accent': exp.type==='professional', 'text-accent3': exp.type==='education', 'text-accent2': exp.type==='association' }"
            fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path v-if="exp.type==='professional'" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          <path v-else-if="exp.type==='education'" d="M12 14l9-5-9-5-9 5 9 5zm0 7V9m-7 4l7 8 7-8"/>
          <path v-else d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
      </div>
        <div class="flex-1 min-w-0">
          <div class="font-medium truncate">{{ exp.title }}</div>
          <div class="text-xs text-muted mt-0.5">{{ exp.organization }} · {{ exp.startDate }} – {{ exp.endDate }}</div>
        </div>
        <div class="flex gap-2 shrink-0">
          <button @click="openForm(exp)" class="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-[var(--border)] text-muted hover:border-accent hover:text-white transition-all">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
          </svg>
        </button>
          <button @click="handleDelete(exp._id)" class="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-all">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
        </svg>
      </button>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <Teleport to="body">
      <div v-if="showForm" class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
           @click.self="showForm = false">
        <div class="bg-surface border border-[var(--border)] rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
          <h2 class="font-syne font-bold text-lg mb-6">{{ editing ? 'Modifier' : 'Ajouter' }} une expérience</h2>
          <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
          <div>
              <label class="form-label">Type *</label>
              <select v-model="form.type" required class="input">
                <option value="professional">Professionnel</option>
                <option value="education">Formation</option>
                <option value="association">Associatif</option>
              </select>
            </div>
            <div>
              <label class="form-label">Titre *</label>
              <input v-model="form.title" required class="input" placeholder="Intitulé du poste / diplôme" />
            </div>
            <div>
              <label class="form-label">Organisation *</label>
              <input v-model="form.organization" required class="input" placeholder="Entreprise, école..." />
            </div>
            <div>
              <label class="form-label">Lieu</label>
              <input v-model="form.location" class="input" placeholder="Casablanca, Tanger..." />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="form-label">Date début *</label>
                <input v-model="form.startDate" required class="input" placeholder="Juillet 2025" />
              </div>
              <div>
                <label class="form-label">Date fin</label>
                <input v-model="form.endDate" class="input" placeholder="Présent" />
              </div>
            </div>
            <div>
              <label class="form-label">Description</label>
              <textarea v-model="form.description" rows="3" class="input resize-none" placeholder="Détails..." />
            </div>
            <div class="flex gap-3 pt-2">
              <button type="submit" :disabled="submitting" class="btn btn-primary flex-1 justify-center">
                {{ submitting ? 'Enregistrement...' : (editing ? 'Mettre à jour' : 'Ajouter') }}
              </button>
              <button type="button" @click="showForm = false" class="btn btn-outline">Annuler</button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { usePortfolioStore } from '@/stores/portfolioStore'

const store = usePortfolioStore()
onMounted(() => store.fetchExperiences())

const showForm  = ref(false)
const editing   = ref(null)
const submitting = ref(false)
const form = ref({ type: 'professional', title: '', organization: '', location: '', startDate: '', endDate: 'Présent', description: '' })

const typeIcon = (type) => ({ professional: '💼', education: '🎓', association: '🤝' }[type] || '📌')

const openForm = (exp = null) => {
  editing.value = exp
  form.value = exp ? { ...exp } : { type: 'professional', title: '', organization: '', location: '', startDate: '', endDate: 'Présent', description: '' }
  showForm.value = true
}

const handleSubmit = async () => {
  submitting.value = true
  try {
    if (editing.value) await store.updateExperience(editing.value._id, form.value)
    else await store.createExperience(form.value)
    showForm.value = false
  } finally {
    submitting.value = false
  }
}

const handleDelete = async (id) => {
  if (confirm('Supprimer cette expérience ?')) await store.deleteExperience(id)
}
</script>

<style scoped>
.form-label { @apply block text-xs font-semibold text-muted mb-1.5 tracking-wider uppercase; }
</style>
