<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref(null)
let ctx = null
let animationId = null
let width = 0
let height = 0

// Mouse interaction
const mouse = { x: 0, y: 0 }
const handleMouseMove = (e) => {
  mouse.x = e.clientX
  mouse.y = e.clientY
}

// Wave configuration
const wave = {
  y: 0,
  length: 0.01,
  amplitude: 100,
  frequency: 0.01,
  phase: 0 // Animation offset
}

const resize = () => {
  width = window.innerWidth
  height = window.innerHeight
  if (canvas.value) {
    canvas.value.width = width
    canvas.value.height = height
  }
}

const animate = () => {
  if (!ctx || !canvas.value) return
  
  // Clear canvas
  // Clear canvas with trail effect
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)' // Trail effect
  ctx.fillRect(0, 0, width, height)

  ctx.beginPath()
  ctx.moveTo(0, height / 2)

  // Draw Sine Wave
  for (let i = 0; i < width; i++) {
    // Distance from mouse for interactivity
    const dist = Math.abs(i - mouse.x)
    const interaction = Math.max(0, 1 - dist / 400) // 0 to 1 based on proximity

    // Dynamic wave calculation
    // Base wave + Mouse influence
    const y = height / 2 + 
              Math.sin(i * wave.length + wave.phase) * (wave.amplitude + interaction * 100) * 
              Math.sin(wave.phase * 0.5) // Breathing effect

    ctx.lineTo(i, y)
  }

  // Styling
  ctx.strokeStyle = `rgba(34, 211, 238, 1)` // Cyan-400 (Neon) full opacity
  ctx.lineWidth = 3
  ctx.stroke()
  
  // Update Phase
  wave.phase += wave.frequency

  animationId = requestAnimationFrame(animate)
}

onMounted(() => {
  if (canvas.value) {
    ctx = canvas.value.getContext('2d')
    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouseMove)
    animate()
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', resize)
  window.removeEventListener('mousemove', handleMouseMove)
  cancelAnimationFrame(animationId)
})
</script>

<template>
  <canvas 
    ref="canvas" 
    class="fixed inset-0 z-[-1] pointer-events-none"
  ></canvas>
</template>

<style scoped>
/* Ensure pure black background if canvas doesn't cover */
canvas {
    background-color: #000;
}
</style>
