<script setup>
import { ref } from 'vue'
import HeroSection from '../components/HeroSection.vue'
import AboutMeSection from '../components/AboutMeSection.vue'
import PortfolioSection from '../components/PortfolioSection.vue'
import ContactSection from '../components/ContactSection.vue'

const aboutMeSection = ref(null)
const portfolioSection = ref(null)
const contactSection = ref(null)

const scrollToAbout = () => {
  aboutMeSection.value?.$el.scrollIntoView({ behavior: 'smooth' })
}

const scrollToPortfolio = () => {
  portfolioSection.value?.$el.scrollIntoView({ behavior: 'smooth' })
}

const scrollToContact = () => {
  contactSection.value?.$el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <main class="text-text overflow-x-hidden">
    <!-- Hero -> About Me -> Portfolio -> Contact -->
    <HeroSection 
      @scroll-to-about="scrollToAbout" 
      @scroll-to-contact="scrollToContact"
    />
    <AboutMeSection ref="aboutMeSection" @scroll-to-portfolio="scrollToPortfolio" />
    <PortfolioSection ref="portfolioSection" @scroll-to-contact="scrollToContact" />
    <ContactSection ref="contactSection" />
  </main>
</template>
