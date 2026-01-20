<script setup>
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <button 
    @click="toggleDark()" 
    class="p-2 rounded-full hover:bg-surface transition-colors duration-200 relative overflow-hidden"
    aria-label="Toggle Theme"
  >
    <Transition name="rotate" mode="out-in">
      <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" key="moon">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" key="sun">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    </Transition>
  </button>
</template>

<style scoped>
.rotate-enter-active,
.rotate-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.rotate-enter-from {
  opacity: 0;
  transform: rotate(-180deg) scale(0.5);
}

.rotate-leave-to {
  opacity: 0;
  transform: rotate(180deg) scale(0.5);
}
</style>
