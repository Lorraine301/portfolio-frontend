<template>
  <div>
    <!-- Curseur personnalisé (desktop uniquement) -->
    <div ref="cursor"      class="cursor"      aria-hidden="true" />
    <div ref="cursorRing"  class="cursor-ring" aria-hidden="true" />

    <!-- Navigation principale -->
    <AppNav v-if="!isAdminRoute" />

    <!-- Transitions entre pages -->
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed} from 'vue'
import AppNav from '@/components/layout/AppNav.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isAdminRoute = computed(() => route.path.startsWith('/admin'))
const cursor     = ref(null)
const cursorRing = ref(null)
let mx = 0, my = 0, rx = 0, ry = 0, raf = null

const onMove = (e) => {
  mx = e.clientX; my = e.clientY
  if (cursor.value) cursor.value.style.transform = `translate(${mx - 6}px,${my - 6}px)`
}
const animRing = () => {
  rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12
  if (cursorRing.value) cursorRing.value.style.transform = `translate(${rx - 20}px,${ry - 20}px)`
  raf = requestAnimationFrame(animRing)
}

onMounted(() => {
  window.addEventListener('mousemove', onMove)
  animRing()
})
onUnmounted(() => {
  window.removeEventListener('mousemove', onMove)
  cancelAnimationFrame(raf)
})
</script>

<style>
.cursor {
  position: fixed; top:0; left:0; width:12px; height:12px;
  background: #7c6ff7; border-radius:50%; pointer-events:none;
  z-index:9999; mix-blend-mode:screen; transition:transform .1s ease;
}
.cursor-ring {
  position:fixed; top:0; left:0; width:40px; height:40px;
  border:1.5px solid #7c6ff7; border-radius:50%; pointer-events:none;
  z-index:9998; opacity:.5; transition:opacity .3s;
}
@media (max-width:768px) { .cursor,.cursor-ring { display:none; } }
</style>
