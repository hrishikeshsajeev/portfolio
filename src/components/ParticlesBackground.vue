<script setup>
import { useDark } from '@vueuse/core'
import { computed } from 'vue'
import particleConfig from '../../particlesjs-config-3.json'

const isDark = useDark()

const options = computed(() => {
  const config = JSON.parse(JSON.stringify(particleConfig))
  
  // Override colors for Dark/Light mode support
  config.particles.color.value = isDark.value ? "#9ca3af" : "#1f2937"
  if (config.particles.links) {
    config.particles.links.color = isDark.value ? "#9ca3af" : "#1f2937"
  }
  
  return config
})
</script>

<template>
  <vue-particles
    :key="isDark ? 'dark' : 'light'"
    id="particles-js"
    class="particles-container"
    :options="options"
  />
</template>

<style scoped>
.particles-container {
  position: fixed;
  inset: 0;
  z-index: 0;
  /* Allow mouse events on canvas for interactivity */
  pointer-events: auto;
}

/* Make sure the canvas inside captures events */
.particles-container :deep(canvas) {
  pointer-events: auto;
}
</style>
