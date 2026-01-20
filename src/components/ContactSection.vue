<script setup>
import { Mail, Linkedin, Github, MapPin, ExternalLink } from 'lucide-vue-next'

const contactMethods = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hrishikeshsajeev5@gmail.com',
    link: 'mailto:hrishikeshsajeev5@gmail.com',
    isExternal: false
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: '/in/hrishikeshsajeev05/',
    link: 'https://www.linkedin.com/in/hrishikeshsajeev05/',
    isExternal: true
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/hrishikeshsajeev',
    link: 'https://github.com/hrishikeshsajeev',
    isExternal: true
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'London, United Kingdom',
    link: null,
    isExternal: false
  }
]
</script>

<template>
  <section class="min-h-screen relative flex flex-col items-center justify-center px-6 py-20 text-white">
    <div class="max-w-3xl w-full">
      
      <h2 
        class="text-4xl md:text-5xl font-light mb-12 text-center tracking-wide"
        v-motion
        :initial="{ opacity: 0, y: -20 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 1000 } }"
      >
        Reach Out!
      </h2>

      <div 
        class="bg-surface/30 backdrop-blur-md rounded-2xl p-8 md:p-10 border border-cyan-500/30 shadow-2xl"
        v-motion
        :initial="{ opacity: 0, scale: 0.95 }"
        :visible="{ opacity: 1, scale: 1, transition: { duration: 800, delay: 200 } }"
      >
        <p class="text-secondary text-lg mb-10 text-center font-light">
          I’m open to full-time, contract, and internship opportunities.
        </p>

        <div class="space-y-4">
          <component 
            :is="method.link ? 'a' : 'div'"
            v-for="(method, index) in contactMethods" 
            :key="method.label"
            :href="method.link"
            :target="method.isExternal ? '_blank' : null"
            class="flex items-center p-5 rounded-xl border border-cyan-500/30 transition-all duration-300 group relative overflow-hidden bg-background/50"
            :class="{ 'hover:bg-gradient-to-r hover:from-cyan-500 hover:to-sky-500 hover:border-transparent cursor-pointer': method.link }"
            v-motion
            :initial="{ opacity: 0, x: -20 }"
            :visible="{ opacity: 1, x: 0, transition: { delay: 300 + (index * 100), duration: 500 } }"
          >
            <div class="p-3 rounded-lg bg-surface/50 border border-white/10 group-hover:bg-white/20 group-hover:border-white/20 transition-colors mr-5">
              <component :is="method.icon" class="w-6 h-6 text-white" />
            </div>
            
            <div class="flex-grow">
              <h3 class="text-sm font-medium text-secondary group-hover:text-white/80 transition-colors">{{ method.label }}</h3>
              <p class="text-lg text-white font-light">{{ method.value }}</p>
            </div>

            <ExternalLink v-if="method.isExternal" class="w-5 h-5 text-secondary opacity-0 group-hover:opacity-100 transition-opacity absolute right-6" />
          </component>
        </div>
      </div>

    </div>
  </section>
</template>
