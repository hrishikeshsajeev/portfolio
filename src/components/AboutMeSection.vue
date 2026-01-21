<script setup>
import { MoveDown, ExternalLink } from 'lucide-vue-next'

const emit = defineEmits(['scrollToPortfolio'])

const skills = [
  'SQL', 'Python', 
  'Tableau', 'Power BI', 
  'Excel (advanced)', 'Data Cleaning', 
  'ETL Pipelines', 'AI Models', 
  'Git'
]
</script>

<template>
  <section class="min-h-screen relative flex flex-col items-center justify-center px-4 md:px-10 py-20 text-foreground">
    
    <h2 
      class="text-4xl md:text-5xl font-light mb-16 tracking-wide"
      v-motion
      :initial="{ opacity: 0, y: -20 }"
      :visible="{ opacity: 1, y: 0, transition: { duration: 1000 } }"
    >
      About Me!
    </h2>

    <div class="max-w-7xl w-full grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-left">
      
      <!-- Column 1: Bio -->
      <div 
        class="border border-cyan-500/30 rounded-lg p-6 md:p-8 flex flex-col"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 800, delay: 100 } }"
      >
        <h3 class="text-2xl font-normal mb-6">Bio</h3>
        <p class="text-secondary text-sm md:text-base leading-relaxed font-light">
          MSc Finance graduate combining strong domain knowledge with technical proficiency in SQL, Python, Tableau, and Excel. Confident self-starter, with excellent communication skills built by collaborating with stakeholders across multiple levels. Passionate about delving into data to uncover insights and applying machine learning techniques and AI to solve complex challenges as evidenced by dissertation on AI and ML. A critical thinker with a growth mindset, eager to join a fast paced team to build upon my analytical skills while providing value to the firm.
        </p>
      </div>

      <!-- Column 2: Qualifications -->
      <div 
        class="border border-cyan-500/30 rounded-lg p-6 md:p-8 flex flex-col"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 800, delay: 200 } }"
      >
        <h3 class="text-2xl font-normal mb-6">Qualifications</h3>
        
        <!-- Education -->
        <div class="mb-8">
          <h4 class="text-lg font-medium mb-2 text-foreground/90">Education</h4>
          <ul class="list-disc list-inside text-secondary text-sm md:text-base space-y-1">
            <li>MSc Finance with Risk Management - University of Bath
              <ul class="list-[circle] list-inside ml-5 mt-1 text-foreground/60">
                <li>Grades : Distinction</li>
              </ul>
            </li>
          </ul>
        </div>

        <!-- Certifications -->
        <div>
          <h4 class="text-lg font-medium mb-4 text-foreground/90">Certifications</h4>
          <div class="space-y-4">
            <a 
              href="https://portal.bloombergforeducation.com/certificates/CsXm1wq8kU495HgM8872UwEf" 
              target="_blank"
              class="block p-3 border border-cyan-500/30 rounded-lg text-sm text-center hover:bg-gradient-to-r hover:from-cyan-500 hover:to-sky-500 hover:border-transparent transition-all duration-300 group flex items-center justify-center gap-2"
            >
              Bloomberg Market Concepts
              <ExternalLink class="w-3 h-3 opacity-50 group-hover:opacity-100" />
            </a>
            <a 
              href="https://www.coursera.org/account/accomplishments/specialization/DN3MU2DS5X8N" 
              target="_blank"
              class="block p-3 border border-cyan-500/30 rounded-lg text-sm text-center hover:bg-gradient-to-r hover:from-cyan-500 hover:to-sky-500 hover:border-transparent transition-all duration-300 group flex items-center justify-center gap-2"
            >
              Google Data Analytics Professional Certificate
              <ExternalLink class="w-3 h-3 opacity-50 group-hover:opacity-100" />
            </a>
          </div>
        </div>
      </div>

      <!-- Column 3: Technical Skills -->
      <div 
        class="border border-cyan-500/30 rounded-lg p-6 md:p-8 flex flex-col"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 800, delay: 300 } }"
      >
        <h3 class="text-2xl font-normal mb-6">Technical Skills</h3>
        <div class="grid grid-cols-2 gap-4">
          <div 
            v-for="skill in skills" 
            :key="skill"
            class="interactive flex items-center justify-center p-3 text-xs md:text-sm text-center border border-cyan-500/30 rounded-full hover:bg-gradient-to-r hover:from-cyan-500 hover:to-sky-500 hover:border-transparent transition-all duration-300 cursor-default"
            replace="true"
          >
            {{ skill }}
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll Down Button -->
    <button 
      @click="$emit('scrollToPortfolio')"
      class="absolute bottom-6 md:bottom-10 right-6 md:right-20 p-3 rounded-full border border-border text-foreground hover:bg-foreground hover:text-background transition-all duration-300 group"
      v-motion
      :initial="{ opacity: 0, scale: 0.8 }"
      :visible="{ opacity: 1, scale: 1, transition: { delay: 1000, duration: 1000 } }"
    >
       <MoveDown class="w-6 h-6 animate-bounce group-hover:animate-none" />
    </button>
  </section>
</template>
