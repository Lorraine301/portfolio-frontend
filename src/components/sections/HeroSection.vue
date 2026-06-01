<template>
  <section class="min-h-screen grid md:grid-cols-2 items-center px-8 md:px-16 pt-28 pb-16 relative overflow-hidden">
    <!-- Background orbs -->
    <div class="orb orb1" />
    <div class="orb orb2" />
    <div class="orb orb3" />

    <!-- Left content -->
    <div class="relative z-10">
      <span class="inline-flex items-center gap-2 text-accent3 text-xs font-semibold tracking-widest uppercase
                   bg-accent3/10 border border-accent3/25 px-4 py-2 rounded-full mb-8 animate-fade-up">
        <span class="w-1.5 h-1.5 rounded-full bg-accent3 animate-pulse-slow" />
        Disponible pour stage PFA
      </span>

      <h1 class="font-syne font-extrabold leading-[1.05] tracking-tight mb-5 animate-fade-up"
          style="font-size: clamp(2.8rem, 5vw, 4.5rem); animation-delay:.1s">
        Andriamasy<br>
        <span class="text-accent">Lorraine Agnès</span><br>
        <span class="text-muted font-bold">RAHELIARISOA</span>
      </h1>
      <p class="text-muted font-light leading-relaxed mb-8 max-w-md animate-fade-up" style="animation-delay:.2s">
         Passionnée par la tech qui change le monde.
         Étudiante Ingénieure en Informatique spécialisée en
      <span class="text-accent font-medium">{{ typedText }}<span class="animate-pulse">|</span></span>
      </p>

      <div class="flex gap-4 flex-wrap animate-fade-up" style="animation-delay:.3s">
        <router-link to="/projects" class="btn btn-primary">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
          Voir mes projets
        </router-link>
        <a href="#contact" class="btn btn-outline">Me contacter</a>
      </div>
    </div>

    <!-- Right: Photo -->
    <div class="flex justify-center items-center relative z-10 mt-12 md:mt-0 animate-fade-up" style="animation-delay:.2s">
      <div class="photo-frame">
        <div class="photo-inner">
          <img v-if="photoUrl" :src="photoUrl" alt="Lorraine Agnès RAHELIARISOA" class="w-full h-full object-cover" />
          <div v-else class="flex flex-col items-center gap-4 text-muted p-8 text-center">
            <svg class="w-20 h-20 opacity-20" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
            </svg>
            <p class="text-sm opacity-60">Ajoutez votre photo<br><span class="text-xs">dans le dossier public/</span></p>
          </div>
        </div>
        <div class="badge-bottom float">
          FST TANGER
          <span class="block text-muted text-[10px] font-normal mt-0.5">Cycle Ingénieur</span>
        </div>
        <div class="badge-top float-delay">🇲🇦 Tanger</div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Pour ajouter votre photo : placez une image dans /public/photo.jpg
// et décommentez la ligne ci-dessous :
// const photoUrl = '/photo.jpg'
const photoUrl = '/photo.png'
import { onMounted, ref } from 'vue'

const typedText  = ref('')
const titles = ['IA & Data Engineering', 'Développement Logiciel', 'Systèmes Intelligents']
let titleIndex = 0, charIndex = 0, deleting = false

onMounted(() => {
  const type = () => {
    const current = titles[titleIndex]
    if (!deleting) {
      typedText.value = current.slice(0, ++charIndex)
      if (charIndex === current.length) { deleting = true; setTimeout(type, 1800); return }
    } else {
      typedText.value = current.slice(0, --charIndex)
      if (charIndex === 0) { deleting = false; titleIndex = (titleIndex + 1) % titles.length }
    }
    setTimeout(type, deleting ? 40 : 80)
  }
  setTimeout(type, 1000)
})
</script>

<style scoped>
.orb { position:absolute; border-radius:50%; filter:blur(80px); pointer-events:none; }
.orb1 { width:500px;height:500px;background:rgba(124,111,247,.18);top:-100px;right:0; }
.orb2 { width:350px;height:350px;background:rgba(111,247,192,.1);bottom:0;left:200px; }
.orb3 { width:250px;height:250px;background:rgba(247,192,111,.08);top:200px;left:0; }

.photo-frame {
  position:relative; width:300px; height:360px;
}
.photo-frame::before {
  content:''; position:absolute; inset:-2px; border-radius:22px;
  background:linear-gradient(135deg,#7c6ff7,#6ff7c0,#f7c06f); z-index:0;
  animation:spin-border 6s linear infinite;
}
@keyframes spin-border {
  0%   { background: linear-gradient(0deg,  #7c6ff7,#6ff7c0,#f7c06f); }
  100% { background: linear-gradient(360deg,#7c6ff7,#6ff7c0,#f7c06f); }
}
.photo-inner {
  position:relative; z-index:1; width:100%; height:100%;
  border-radius:20px; overflow:hidden; background: var(--surface);
  display:flex; align-items:center; justify-content:center;
}
.badge-bottom {
  position:absolute; bottom:-18px; right:-18px; z-index:2;
  background:var(--surface); border:1px solid var(--border); border-radius:14px;
  padding:.8rem 1rem; font-family:'Syne',sans-serif; font-size:.7rem;
  font-weight:700; color:#f7c06f; letter-spacing:.05em;
  backdrop-filter:blur(8px);
}
.badge-top {
  position:absolute; top:-14px; left:-20px; z-index:2;
  background:#7c6ff7; border-radius:10px;
  padding:.55rem .9rem; font-size:.7rem; font-weight:600; color:#fff;
}
</style>
