<script setup>
import { ref, onMounted } from 'vue'
import { fetchRepos, fetchRepoImage } from '../services/github'
import ProjectCard from './ProjectCard.vue'
import { MoveDown } from 'lucide-vue-next'

const emit = defineEmits(['scrollToContact'])


const projects = ref([])
const loading = ref(true)
const error = ref(null)

const loadProjects = async () => {
  try {
    loading.value = true
    const repos = await fetchRepos()
    
    const projectsWithImages = await Promise.all(
        repos.map(async (project) => {
            if (project.image) return project 
            
            if (project.repo_url) {
                const repoName = project.repo_url.split('/').pop()
                const dynamicImage = await fetchRepoImage(repoName, project.default_branch)
                return { ...project, image: dynamicImage || null }
            }
            return project
        })
    )
    
    projects.value = projectsWithImages
  } catch (err) {
    error.value = 'Failed to load projects.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadProjects()
})
</script>

<template>
  <section class="min-h-screen w-full px-6 py-20 relative">
    <div class="max-w-7xl mx-auto">
      <h2 
        class="text-5xl font-thin text-foreground mb-16 text-center tracking-wide"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 1000 } }"
      >
        My Portfolio
      </h2>

      <!-- Loading State -->
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="n in 3" :key="n" class="h-96 bg-surface rounded-xl animate-pulse"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-20 text-red-500">
        {{ error }}
      </div>

      <!-- Projects Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ProjectCard 
          v-for="(project, index) in projects" 
          :key="project.id" 
          :repo="project" 
          :image="project.image"
          :style="{ transitionDelay: `${index * 100}ms` }"
        />
      </div>
    </div>

    <!-- Scroll Down Button -->
    <button 
      @click="$emit('scrollToContact')"
      class="absolute bottom-10 right-6 md:right-20 p-3 rounded-full border border-border text-foreground hover:bg-foreground hover:text-background transition-all duration-300 group"
      v-motion
      :initial="{ opacity: 0, scale: 0.8 }"
      :visible="{ opacity: 1, scale: 1, transition: { delay: 1000, duration: 1000 } }"
    >
       <MoveDown class="w-6 h-6 animate-bounce group-hover:animate-none" />
    </button>
  </section>
</template>
