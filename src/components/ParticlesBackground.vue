<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const canvas = ref(null)
let ctx = null
let animationFrameId = null
let particles = []
const mouse = { x: null, y: null, radius: 150 }

const props = defineProps({
  color: { type: String, default: '147, 51, 234' }, // Purple-600 RGB
  particleCount: { type: Number, default: 80 },
  connectionDistance: { type: Number, default: 150 }
})

const resizeCanvas = () => {
  if (canvas.value) {
    canvas.value.width = window.innerWidth
    canvas.value.height = window.innerHeight
    initParticles()
  }
}

class Particle {
  constructor(x, y, opacity = Math.random() * 0.5 + 0.4) {
    this.x = x
    this.y = y
    this.size = Math.random() * 2 + 1
    this.speedX = Math.random() * 1 - 0.5
    this.speedY = Math.random() * 1 - 0.5
    this.opacity = opacity
  }

  update() {
    this.x += this.speedX
    this.y += this.speedY

    // Wrap around screen
    if (this.x > canvas.value.width) this.x = 0
    else if (this.x < 0) this.x = canvas.value.width
    if (this.y > canvas.value.height) this.y = 0
    else if (this.y < 0) this.y = canvas.value.height

    // Mouse interaction
    let dx = mouse.x - this.x
    let dy = mouse.y - this.y
    let distance = Math.sqrt(dx * dx + dy * dy)
    
    // Push particles away slightly if too close
    if (distance < mouse.radius) {
        const forceDirectionX = dx / distance
        const forceDirectionY = dy / distance
        const force = (mouse.radius - distance) / mouse.radius
        const directionX = forceDirectionX * force * 3
        const directionY = forceDirectionY * force * 3
        
        if (distance < mouse.radius) {
            this.x -= directionX
            this.y -= directionY
        }
    }
  }

  draw() {
    ctx.fillStyle = `rgba(${props.color}, ${this.opacity})`
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
  }
}

const initParticles = () => {
  particles = []
  // Standard particles
  for (let i = 0; i < props.particleCount; i++) {
    let x = Math.random() * canvas.value.width
    let y = Math.random() * canvas.value.height
    particles.push(new Particle(x, y))
  }
}

const animate = () => {
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
  
  for (let i = 0; i < particles.length; i++) {
    particles[i].update()
    particles[i].draw()

    // Draw lines
    for (let j = i; j < particles.length; j++) {
      let dx = particles[i].x - particles[j].x
      let dy = particles[i].y - particles[j].y
      let distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < props.connectionDistance) {
        ctx.beginPath()
        let opacity = 1 - distance / props.connectionDistance
        ctx.strokeStyle = `rgba(${props.color}, ${opacity * 0.5})`
        ctx.lineWidth = 1
        ctx.moveTo(particles[i].x, particles[i].y)
        ctx.lineTo(particles[j].x, particles[j].y)
        ctx.stroke()
      }
    }
  }
  animationFrameId = requestAnimationFrame(animate)
}

const handleMouseMove = (e) => {
  mouse.x = e.x
  mouse.y = e.y
}

onMounted(() => {
  ctx = canvas.value.getContext('2d')
  resizeCanvas()
  animate()
  window.addEventListener('resize', resizeCanvas)
  window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeCanvas)
  window.removeEventListener('mousemove', handleMouseMove)
  cancelAnimationFrame(animationFrameId)
})
</script>

<template>
  <canvas 
    ref="canvas" 
    class="fixed inset-0 pointer-events-none z-0"
  />
</template>
