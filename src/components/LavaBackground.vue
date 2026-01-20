<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const orb = ref({ x: 0, y: 0 })
const target = { x: 0, y: 0 }
const speed = 0.05 // Very slow, lazy movement

const handleMouseMove = (e) => {
  target.x = e.clientX
  target.y = e.clientY
}

const animate = () => {
  // Interpolate for smooth lag
  orb.value.x += (target.x - orb.value.x) * speed
  orb.value.y += (target.y - orb.value.y) * speed
  
  requestAnimationFrame(animate)
}

onMounted(() => {
  // Center initially
  target.x = window.innerWidth / 2
  target.y = window.innerHeight / 2
  orb.value.x = target.x
  orb.value.y = target.y

  window.addEventListener('mousemove', handleMouseMove)
  requestAnimationFrame(animate)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<template>
  <div class="fixed inset-0 z-0 overflow-hidden bg-black pointer-events-none">
    <!-- The Lava Orb -->
    <div 
      class="absolute w-[600px] h-[600px] rounded-full filter blur-[100px] mix-blend-screen transition-colors duration-1000"
      :style="{
        background: 'radial-gradient(circle, rgba(34,211,238,0.8) 0%, rgba(14,165,233,0.4) 50%, rgba(0,0,0,0) 70%)', // Cyan-400 to Sky-500
        transform: `translate(${orb.x - 300}px, ${orb.y - 300}px)`
      }"
    ></div>

    <!-- Optional: Second Orb for depth (slower/counter-movement) if desired later -->
  </div>
</template>

<style scoped>
/* Ensure smooth hardware acceleration */
div {
    will-change: transform;
}
</style>
