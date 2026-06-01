<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="font-syne font-extrabold text-2xl">Projets</h1>
        <p class="text-muted text-sm mt-1">{{ store.projects.length }} projet(s) au total</p>
      </div>
      <button @click="openForm()" class="btn btn-primary">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M12 5v14M5 12h14"/>
        </svg>
        Ajouter un projet
      </button>
    </div>

    <!-- List -->
    <div v-if="store.loading" class="space-y-3">
      <div v-for="n in 4" :key="n" class="card p-4 animate-pulse h-16" />
    </div>

    <div v-else class="space-y-3">
      <div v-for="project in store.projects" :key="project._id"
           class="card p-4 flex items-center gap-4">
        <img v-if="project.imageUrl" :src="project.imageUrl" class="w-12 h-12 rounded-lg object-cover shrink-0" />
        <div v-else class="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
            <svg class="w-5 h-5 text-accent/50" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M3 7a2 2 0 012-2h4l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"/>
            </svg>
          </div>
        <div class="flex-1 min-w-0">
          <div class="font-medium truncate">{{ project.title }}</div>
          <div class="text-xs text-muted flex gap-2 mt-0.5">
            <span class="text-accent3">{{ project.category }}</span>
            <span v-if="project.featured" class="text-accent2">★ Mis en avant</span>
          </div>
        </div>

        <div class="flex gap-2 shrink-0">
            <button @click="openForm(project)" class="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-[var(--border)] text-muted hover:border-accent hover:text-white transition-all">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
            Modifier
          </button>
            <button @click="confirmDelete(project)" class="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-all">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
          Supprimer
        </button>
        </div>
      </div>
    </div>

    <!-- Modal Form -->
    <Teleport to="body">
      <div v-if="showForm" class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
           @click.self="showForm = false">
        <div class="bg-surface border border-[var(--border)] rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
          <h2 class="font-syne font-bold text-lg mb-6">
            {{ editingProject ? '✏️ Modifier le projet' : '➕ Nouveau projet' }}
          </h2>

          <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
            <div>
              <label class="form-label">Titre *</label>
              <input v-model="form.title" required class="input" placeholder="Nom du projet" />
            </div>

            <div>
              <label class="form-label">Description *</label>
              <textarea v-model="form.description" required rows="3" class="input resize-none"
                        placeholder="Décrivez le projet..." />
            </div>

            <div>
              <label class="form-label">Catégorie *</label>
              <select v-model="form.category" required class="input">
                <option value="">-- Choisir --</option>
                <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
              </select>
            </div>

            <div>
              <label class="form-label">Technologies * <span class="text-muted font-normal">(séparées par des virgules)</span></label>
              <input v-model="techInput" class="input" placeholder="Vue.js, Node.js, MongoDB..." />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="form-label">Lien GitHub</label>
                <input v-model="form.githubUrl" type="url" class="input" placeholder="https://github.com/..." />
              </div>
              <div>
                <label class="form-label">Lien Live</label>
                <input v-model="form.liveUrl" type="url" class="input" placeholder="https://..." />
              </div>
            </div>

            <div>
              <label class="form-label">Image du projet</label>
              <input type="file" accept="image/*" @change="onFileChange"
                     class="input text-muted file:mr-3 file:py-1 file:px-3 file:rounded-lg
                            file:border-0 file:bg-accent/20 file:text-accent file:text-xs file:cursor-pointer" />
              <div v-if="imagePreview || form.imageUrl" class="mt-2">
                <img :src="imagePreview || form.imageUrl" class="h-24 rounded-lg object-cover" />
              </div>
            </div>

            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" v-model="form.featured" class="w-4 h-4 accent-[#7c6ff7]" />
              <span class="text-sm text-muted">Mettre ce projet en avant (page d'accueil)</span>
            </label>

            <p v-if="formError" class="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg p-3">
              {{ formError }}
            </p>

            <div class="flex gap-3 pt-2">
              <button type="submit" :disabled="submitting" class="btn btn-primary flex-1 justify-center">
                <svg v-if="submitting" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                {{ submitting ? 'Enregistrement...' : (editingProject ? 'Mettre à jour' : 'Créer le projet') }}
              </button>
              <button type="button" @click="showForm = false" class="btn btn-outline">Annuler</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Confirm delete modal -->
      <div v-if="deletingProject" class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div class="bg-surface border border-[var(--border)] rounded-2xl p-6 w-full max-w-sm text-center">
          <div class="text-4xl mb-4">🗑️</div>
          <h3 class="font-syne font-bold text-lg mb-2">Supprimer ce projet ?</h3>
          <p class="text-muted text-sm mb-6">« {{ deletingProject.title }} » sera supprimé définitivement.</p>
          <div class="flex gap-3">
            <button @click="handleDelete" :disabled="submitting" class="btn btn-danger flex-1 justify-center">
              {{ submitting ? 'Suppression...' : 'Oui, supprimer' }}
            </button>
            <button @click="deletingProject = null" class="btn btn-outline flex-1 justify-center">Annuler</button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useProjectStore } from '@/stores/projectStore'

const store = useProjectStore()
onMounted(() => store.fetchProjects())

const categories = ['IA / ML', 'Big Data', 'Blockchain', 'Mobile', 'Web', 'Cybersécurité', 'DevOps', 'Autre']

const showForm       = ref(false)
const editingProject = ref(null)
const deletingProject = ref(null)
const submitting     = ref(false)
const formError      = ref(null)
const imagePreview   = ref(null)
const imageFile      = ref(null)
const techInput      = ref('')

const form = ref({ title: '', description: '', category: '', githubUrl: '', liveUrl: '', featured: false })

const openForm = (project = null) => {
  editingProject.value = project
  formError.value      = null
  imagePreview.value   = null
  imageFile.value      = null
  if (project) {
    form.value   = { ...project }
    techInput.value = project.technologies.join(', ')
  } else {
    form.value   = { title: '', description: '', category: '', githubUrl: '', liveUrl: '', featured: false }
    techInput.value = ''
  }
  showForm.value = true
}

const onFileChange = (e) => {
  const file = e.target.files[0]
  if (!file) return
  imageFile.value    = file
  imagePreview.value = URL.createObjectURL(file)
}

const handleSubmit = async () => {
  submitting.value = true
  formError.value  = null
  try {
    const fd = new FormData()
    fd.append('title',        form.value.title)
    fd.append('description',  form.value.description)
    fd.append('category',     form.value.category)
    fd.append('technologies', JSON.stringify(techInput.value.split(',').map((t) => t.trim()).filter(Boolean)))
    fd.append('githubUrl',    form.value.githubUrl || '')
    fd.append('liveUrl',      form.value.liveUrl   || '')
    fd.append('featured',     form.value.featured)
    if (imageFile.value) fd.append('image', imageFile.value)

    if (editingProject.value) {
      await store.updateProject(editingProject.value._id, fd)
    } else {
      await store.createProject(fd)
    }
    showForm.value = false
  } catch (e) {
    formError.value = e.response?.data?.message || 'Une erreur est survenue'
  } finally {
    submitting.value = false
  }
}

const confirmDelete = (project) => { deletingProject.value = project }
const handleDelete  = async () => {
  submitting.value = true
  try {
    await store.deleteProject(deletingProject.value._id)
    deletingProject.value = null
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.form-label { @apply block text-xs font-semibold text-muted mb-1.5 tracking-wider uppercase; }
</style>
