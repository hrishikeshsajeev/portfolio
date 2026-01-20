<script setup>
import { RouterView } from 'vue-router'
import { ref, onMounted } from 'vue'
import ThemeToggle from './components/ThemeToggle.vue'
import Preloader from './components/Preloader.vue'
import ParticlesBackground from './components/ParticlesBackground.vue'
import CustomCursor from './components/CustomCursor.vue'

const isLoading = ref(true)

onMounted(() => {
  // Simulate loading or wait for resources
  setTimeout(() => {
    isLoading.value = false
  }, 2000)
})
</script>

<template>
  <div class="min-h-screen text-text overflow-hidden relative">
    <CustomCursor />
    <Preloader :loading="isLoading" />
    <ParticlesBackground color="34, 211, 238" />

    <header class="fixed top-0 left-0 right-0 p-6 z-50 flex justify-end items-center mix-blend-difference text-white">
      <ThemeToggle />
    </header>
    
    <div class="relative z-10">
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </div>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
