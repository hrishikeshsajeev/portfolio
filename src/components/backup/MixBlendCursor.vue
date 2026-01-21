<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Dot position (follows instantly)
const dotX = ref(0)
const dotY = ref(0)

// Circle position (trails behind)
const circleX = ref(0)
const circleY = ref(0)

// State
const isHovering = ref(false)
const isVisible = ref(false)
const hasMixBlend = ref(false)

// Lerp values (higher = faster)
const dotLerp = 1.0      // Instant follow
const circleLerp = 0.08  // Trailing effect (lazier)

let animationFrame = null
let targetX = 0
let targetY = 0

const updateTarget = (e) => {
  targetX = e.clientX
  targetY = e.clientY
  if (!isVisible.value) isVisible.value = true
}

const animate = () => {
  // Dot follows instantly
  dotX.value += (targetX - dotX.value) * dotLerp
  dotY.value += (targetY - dotY.value) * dotLerp
  
  // Circle trails behind
  circleX.value += (targetX - circleX.value) * circleLerp
  circleY.value += (targetY - circleY.value) * circleLerp
  
  animationFrame = requestAnimationFrame(animate)
}

const checkHover = (e) => {
  const target = e.target
  
  // Check for mix-blend-mode attribute
  const mixBlendEl = target.closest('[data-cursor-mix-blend-mode]')
  hasMixBlend.value = !!mixBlendEl
  
  // Check if hovering over interactive elements
  const isInteractive = target.closest(
    'a, button, input, textarea, [data-cursor-hover], .interactive, [role="button"]'
  )
  isHovering.value = !!isInteractive
}

const handleMouseLeave = () => {
  isVisible.value = false
}

const handleMouseEnter = () => {
  isVisible.value = true
}

onMounted(() => {
  // Check if touch device - don't show custom cursor on touch
  if ('ontouchstart' in window) return
  
  document.addEventListener('mousemove', updateTarget)
  document.addEventListener('mouseover', checkHover)
  document.addEventListener('mouseleave', handleMouseLeave)
  document.addEventListener('mouseenter', handleMouseEnter)
  
  // Start animation loop
  animate()
  
  // Hide default cursor globally
  document.documentElement.style.cursor = 'none'
})

onUnmounted(() => {
  document.removeEventListener('mousemove', updateTarget)
  document.removeEventListener('mouseover', checkHover)
  document.removeEventListener('mouseleave', handleMouseLeave)
  document.removeEventListener('mouseenter', handleMouseEnter)
  
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
  
  // Restore default cursor
  document.documentElement.style.cursor = ''
})
</script>

<template>
  <!-- The Dot - follows mouse instantly -->
  <div 
    class="cursor-dot"
    :class="{ 
      'is-visible': isVisible,
      'is-hovering': isHovering,
      'has-blend': hasMixBlend
    }"
    :style="{
      transform: `translate(${dotX}px, ${dotY}px)`
    }"
  ></div>
  
  <!-- The Circle - trails behind the dot -->
  <div 
    class="cursor-circle"
    :class="{ 
      'is-visible': isVisible,
      'is-hovering': isHovering,
      'has-blend': hasMixBlend
    }"
    :style="{
      transform: `translate(${circleX}px, ${circleY}px)`
    }"
  ></div>
</template>

<style scoped>
/* The Dot - small, solid, follows instantly */
.cursor-dot {
  position: fixed;
  top: 0;
  left: 0;
  width: 6px;
  height: 6px;
  margin-left: -3px;
  margin-top: -3px;
  background-color: var(--foreground);
  border-radius: 50%;
  pointer-events: none;
  z-index: 10000;
  opacity: 0;
  transition: opacity 0.3s ease, width 0.2s ease, height 0.2s ease, margin 0.2s ease, background-color 0.2s ease;
}

.cursor-dot.is-visible {
  opacity: 1;
}

.cursor-dot.is-hovering {
  width: 10px;
  height: 10px;
  margin-left: -5px;
  margin-top: -5px;
  background-color: var(--primary);
}

.cursor-dot.has-blend {
  mix-blend-mode: difference;
  background-color: white;
}

/* The Circle - larger, outlined, trails behind */
.cursor-circle {
  position: fixed;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  margin-left: -20px;
  margin-top: -20px;
  border: 1px solid var(--foreground);
  background: transparent;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  opacity: 0;
  transition: opacity 0.3s ease, width 0.25s ease, height 0.25s ease, margin 0.25s ease, border-color 0.2s ease, background-color 0.2s ease;
}

.cursor-circle.is-visible {
  opacity: 0.5;
}

.cursor-circle.is-hovering {
  width: 60px;
  height: 60px;
  margin-left: -30px;
  margin-top: -30px;
  opacity: 0.8;
  border-color: var(--primary);
}

.cursor-circle.has-blend {
  mix-blend-mode: difference;
  border-color: white;
  background-color: rgba(255, 255, 255, 0.1);
}

/* Hide cursor globally */
:global(*) {
  cursor: none !important;
}
</style>
