<script setup>
import { MoveDown } from 'lucide-vue-next'
import profileImage from '../assets/uploaded_image_1_1768906165714.png'

const emit = defineEmits(['scrollToAbout', 'scrollToContact'])
</script>

<template>
  <section class="min-h-screen relative flex flex-col justify-center px-6 md:px-20 py-10">
    <div class="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      
      <!-- Left: Profile Photo -->
      <div 
        class="flex justify-center md:justify-start"
        v-motion
        :initial="{ opacity: 0, scale: 0.8 }"
        :enter="{ opacity: 1, scale: 1, transition: { duration: 1000 } }"
      >
        <div class="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl">
          <img :src="profileImage" alt="Hrishikesh Sajeev" class="w-full h-full object-cover" />
        </div>
      </div>

      <!-- Right: Content -->
      <div class="text-left space-y-8">
        <!-- Name -->
        <h1 
          class="text-5xl md:text-7xl font-sans font-light text-white tracking-tight"
          v-motion
          :initial="{ opacity: 0, x: 50 }"
          :enter="{ opacity: 1, x: 0, transition: { duration: 1000, delay: 200 } }"
        >
          RANGE NAIR
        </h1>

        <!-- Bio Section -->
        <div 
          class="space-y-4"
          v-motion
          :initial="{ opacity: 0, x: 50 }"
          :enter="{ opacity: 1, x: 0, transition: { duration: 1000, delay: 400 } }"
        >
          <h2 class="text-2xl text-secondary font-light">A bit about me!</h2>
          <div class="p-6 border border-cyan-500/30 rounded-lg bg-transparent">
            <p class="text-lg text-secondary leading-relaxed">
              MSc Finance Graduate from University of Bath. I enjoy using data to provide actionable business recommendations.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Navigation Buttons -->
    <div 
      class="absolute bottom-10 left-6 md:left-20 flex flex-wrap gap-4"
      v-motion
      :initial="{ opacity: 0, y: 20 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 1000, delay: 800 } }"
    >
      <a href="https://drive.google.com/file/d/1o0-4Paka0VtxxYxODrtrAWmYQfhfr_8H/view?usp=share_link" target="_blank" class="px-6 py-2 border border-white text-white font-medium rounded-lg hover:bg-gradient-to-r hover:from-cyan-500 hover:to-sky-500 hover:border-transparent transition-all duration-300">
        Resume
      </a>
      <a href="https://www.linkedin.com/in/hrishikeshsajeev05/" target="_blank" class="px-6 py-2 border border-white text-white font-medium rounded-lg hover:bg-gradient-to-r hover:from-cyan-500 hover:to-sky-500 hover:border-transparent transition-all duration-300">
        LinkedIn
      </a>
      <button 
        @click="$emit('scrollToContact')"
        class="px-6 py-2 border border-white text-white font-medium rounded-lg hover:bg-gradient-to-r hover:from-cyan-500 hover:to-sky-500 hover:border-transparent transition-all duration-300"
      >
        Contact me
      </button>
    </div>

    <!-- Scroll Down Button -->
    <button 
      @click="$emit('scrollToAbout')"
      class="absolute bottom-10 right-6 md:right-20 p-4 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all duration-300 group"
      v-motion
      :initial="{ opacity: 0, scale: 0.8 }"
      :enter="{ opacity: 1, scale: 1, transition: { duration: 1000, delay: 1000 } }"
    >
       <MoveDown class="w-6 h-6 animate-bounce group-hover:animate-none" />
    </button>
  </section>
</template>
