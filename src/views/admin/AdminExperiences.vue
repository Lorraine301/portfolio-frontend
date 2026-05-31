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
        <span class="text-2xl shrink-0">{{ typeIcon(exp.type) }}</span>
        <div class="flex-1 min-w-0">
          <div class="font-medium truncate">{{ exp.title }}</div>
          <div class="text-xs text-muted mt-0.5">{{ exp.organization }} · {{ exp.startDate }} – {{ exp.endDate }}</div>
        </div>
        <div class="flex gap-2 shrink-0">
          <button @click="openForm(exp)" class="btn text-xs px-3 py-1.5 border border-[var(--border)] text-muted hover:border-accent hover:text-white">✏️</button>
          <button @click="handleDelete(exp._id)" class="btn btn-danger text-xs px-3 py-1.5">🗑️</button>
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
                <option value="professional">💼 Professionnel</option>
                <option value="education">🎓 Formation</option>
                <option value="association">🤝 Associatif</option>
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
