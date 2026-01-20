<script setup>
import { ref } from 'vue'

defineProps({
  repo: Object,
  image: String
})

const imageError = ref(false)
</script>

<template>
  <a 
    :href="repo.repo_url" 
    target="_blank" 
    class="block group relative bg-surface rounded-xl overflow-hidden border border-secondary/10 hover:border-primary/30 transition-all duration-300"
    v-motion
    :initial="{ opacity: 0, y: 50 }"
    :visibleOnce="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50, damping: 20 } }"
  >
    <!-- Image Area -->
    <div class="h-48 bg-secondary/20 overflow-hidden relative">
      <img 
        v-if="image && !imageError" 
        :src="image" 
        alt="Project Banner" 
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        @error="imageError = true"
      />
      <!-- Fallback Gradient -->
      <div v-else class="w-full h-full bg-gradient-to-br from-primary/10 to-purple-600/10 flex items-center justify-center group-hover:from-primary/20 group-hover:to-purple-600/20 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-primary/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      
      <!-- Category Badge -->
      <div v-if="repo.category" class="absolute top-4 left-4">
        <span class="px-3 py-1 text-xs font-semibold rounded-full bg-black/50 backdrop-blur-md text-white border border-white/10 shadow-sm">
          {{ repo.category }}
        </span>
      </div>
    </div>

    <!-- Content Area -->
    <div class="p-6">
      <h3 class="text-xl font-bold mb-3 text-text group-hover:text-primary transition-colors flex items-center justify-between">
        {{ repo.name }}
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </h3>
      
      <!-- Highlights (Bullet Points) -->
      <ul v-if="repo.highlights" class="mb-6 space-y-2">
         <li v-for="(point, i) in repo.highlights" :key="i" class="flex items-start text-sm text-secondary">
            <span class="mr-2 mt-1.5 w-1 h-1 rounded-full bg-primary flex-shrink-0"></span>
            {{ point }}
         </li>
      </ul>
      <p v-else class="text-sm text-secondary line-clamp-3 mb-4">
        {{ repo.description }}
      </p>
      
      <!-- Tags -->
      <div class="flex flex-wrap gap-2 mt-auto">
        <span 
          v-for="tag in repo.tags" 
          :key="tag"
          class="px-2 py-1 text-[11px] font-medium rounded bg-secondary/10 text-secondary border border-secondary/10"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </a>
</template>
