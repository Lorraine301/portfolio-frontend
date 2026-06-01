<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="font-syne font-extrabold text-2xl">Compétences</h1>
        <p class="text-muted text-sm mt-1">{{ store.skills.length }} catégorie(s)</p>
      </div>
      <button @click="openForm()" class="btn btn-primary">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
        Ajouter une catégorie
      </button>
    </div>

    <div class="grid md:grid-cols-2 gap-4">
      <div v-for="skill in store.skills" :key="skill._id" class="card p-5">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <span class="text-xl">{{ skill.icon }}</span>
            <span class="font-syne font-bold text-sm">{{ skill.category }}</span>
          </div>
          <div class="flex gap-2">
           <!-- Bouton modifier -->
          <button @click="openForm(skill)" class="text-xs px-2.5 py-1.5 rounded-lg border border-[var(--border)] text-muted hover:border-accent hover:text-white transition-all flex items-center gap-1">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
            Modifier
          </button>

          <!-- Bouton supprimer -->
          <button @click="handleDelete(skill._id)" class="text-xs px-2.5 py-1.5 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-all flex items-center gap-1">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
            Supprimer
          </button>
          </div>
        </div>
        <div class="flex flex-wrap gap-1.5">
          <span v-for="item in skill.items" :key="item" class="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-muted">{{ item }}</span>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <div v-if="showForm" class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" @click.self="showForm = false">
        <div class="bg-surface border border-[var(--border)] rounded-2xl w-full max-w-md p-6">
          <h2 class="font-syne font-bold text-lg mb-6">{{ editing ? 'Modifier' : 'Ajouter' }} une catégorie</h2>
          <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="form-label">Catégorie *</label>
                <input v-model="form.category" required class="input" placeholder="Langages & Web" />
              </div>
              <div>
                <label class="form-label">Icône</label>
                <input v-model="form.icon" class="input" placeholder="💻" />
              </div>
            </div>
            <div>
              <label class="form-label">Couleur</label>
              <select v-model="form.color" class="input">
                <option value="purple">Violet</option>
                <option value="teal">Vert/Cyan</option>
                <option value="amber">Doré</option>
                <option value="pink">Rose</option>
                <option value="blue">Bleu</option>
                <option value="coral">Orange</option>
              </select>
            </div>
            <div>
              <label class="form-label">Compétences * <span class="text-muted font-normal">(séparées par des virgules)</span></label>
              <textarea v-model="itemsInput" required rows="3" class="input resize-none" placeholder="Vue.js, React, Node.js..." />
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
onMounted(() => store.fetchSkills())

const showForm   = ref(false)
const editing    = ref(null)
const submitting = ref(false)
const itemsInput = ref('')
const form = ref({ category: '', icon: '💻', color: 'purple' })

const openForm = (skill = null) => {
  editing.value    = skill
  form.value       = skill ? { category: skill.category, icon: skill.icon, color: skill.color } : { category: '', icon: '💻', color: 'purple' }
  itemsInput.value = skill ? skill.items.join(', ') : ''
  showForm.value   = true
}

const handleSubmit = async () => {
  submitting.value = true
  try {
    const payload = { ...form.value, items: itemsInput.value.split(',').map((i) => i.trim()).filter(Boolean) }
    if (editing.value) await store.updateSkill(editing.value._id, payload)
    else await store.createSkill(payload)
    showForm.value = false
  } finally {
    submitting.value = false
  }
}

const handleDelete = async (id) => {
  if (confirm('Supprimer cette catégorie ?')) await store.deleteSkill(id)
}
</script>

<style scoped>
.form-label { @apply block text-xs font-semibold text-muted mb-1.5 tracking-wider uppercase; }
</style>
