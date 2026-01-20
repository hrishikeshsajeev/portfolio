<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const cursorInner = ref(null)
const cursorOuter = ref(null)

// Coordinates
const mouse = { x: -100, y: -100 } // Actual mouse pos
const outerPos = { x: -100, y: -100 } // Lagged pos for ring
const innerPos = { x: -100, y: -100 } // Direct pos for dot

// Config
const speed = 0.15

// State
const isHovering = ref(false)
const isMagnetic = ref(false) // For small buttons (Snap + Vanish)
const isVanish = ref(false)   // For large cards (Vanish only)
const clickState = ref(false)

// Magnetic Target Storage
const magnet = { x: 0, y: 0, width: 0, height: 0, el: null }

const updateMouse = (e) => {
  mouse.x = e.clientX
  mouse.y = e.clientY
  
  // Boundary Check for Active Magnet
  if (isMagnetic.value && magnet.el) {
      const rect = magnet.el.getBoundingClientRect()
      // Strict + slight buffer for robust stickiness
      const buffer = 20 
      const isInside = 
          mouse.x >= rect.left - buffer && 
          mouse.x <= rect.right + buffer && 
          mouse.y >= rect.top - buffer && 
          mouse.y <= rect.bottom + buffer
      
      if (!isInside) {
          resetCursor()
      }
  } else if (isVanish.value && magnet.el) {
      // Logic for Large Cards (Vanish Only) - Check if left card
      const rect = magnet.el.getBoundingClientRect()
      const isInside = 
          mouse.x >= rect.left && 
          mouse.x <= rect.right && 
          mouse.y >= rect.top && 
          mouse.y <= rect.bottom
      
      if (!isInside) {
          resetCursor()
      }
  }
}

const handleMouseOver = (e) => {
  const target = e.target.closest('a, button, .interactive')
  if (target) {
    const rect = target.getBoundingClientRect()
    
    // Check Size
    if (rect.width > 350 || rect.height > 100) {
        // Large Element: Just Vanish (Let CSS hover take focus)
        isVanish.value = true
        isMagnetic.value = false
        magnet.el = target
    } else {
        // Small Element: Magnetic Snap + Vanish
        isMagnetic.value = true
        isVanish.value = false
        magnet.el = target
        magnet.x = rect.left + rect.width / 2
        magnet.y = rect.top + rect.height / 2
        magnet.width = rect.width
        magnet.height = rect.height
    }
    isHovering.value = true
  }
}

const resetCursor = () => {
    isMagnetic.value = false
    isVanish.value = false
    isHovering.value = false
    magnet.el = null
}

const handleDown = () => clickState.value = true
const handleUp = () => clickState.value = false

const animate = () => {
  try {
      // OUTER RING LOGIC
      if (isMagnetic.value) {
        // Snap to magnet center
        outerPos.x += (magnet.x - outerPos.x) * (speed * 2)
        outerPos.y += (magnet.y - outerPos.y) * (speed * 2)
      } else {
        // Follow mouse lag
        outerPos.x += (mouse.x - outerPos.x) * speed
        outerPos.y += (mouse.y - outerPos.y) * speed
      }

      // INNER DOT LOGIC (Always mouse unless specific effect needed)
      innerPos.x = mouse.x
      innerPos.y = mouse.y

      // Apply Transforms
      if (cursorOuter.value) {
        cursorOuter.value.style.transform = `translate3d(${outerPos.x}px, ${outerPos.y}px, 0)`
      }
      if (cursorInner.value) {
        cursorInner.value.style.transform = `translate3d(${innerPos.x}px, ${innerPos.y}px, 0)`
      }

  } catch (err) { /* Safe */ }
  
  requestAnimationFrame(animate)
}

onMounted(() => {
  window.addEventListener('mousemove', updateMouse)
  window.addEventListener('mouseover', handleMouseOver)
  window.addEventListener('mousedown', handleDown)
  window.addEventListener('mouseup', handleUp)
  requestAnimationFrame(animate)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', updateMouse)
  window.removeEventListener('mouseover', handleMouseOver)
  window.removeEventListener('mousedown', handleDown)
  window.removeEventListener('mouseup', handleUp)
})
</script>

<template>
  <div class="fixed top-0 left-0 z-[9999] pointer-events-none">
    
    <!-- OUTER RING (The Magnetic One) -->
    <div 
      ref="cursorOuter"
      class="fixed top-0 left-0 border border-white rounded-full transition-all duration-300 ease-out flex items-center justify-center box-border"
      :class="[
        (isMagnetic || isVanish) ? 'opacity-0 scale-90' : 'opacity-40 scale-100',
        clickState ? 'scale-75' : ''
      ]"
      :style="{
        width: isMagnetic ? `${magnet.width}px` : '40px',
        height: isMagnetic ? `${magnet.height}px` : '40px',
        borderRadius: isMagnetic ? '12px' : '50%',
        transform: 'translate(-50%, -50%)',
        marginLeft: '-20px', // Offset adjustment for size changes? No, translate handles it.
        marginTop: '-20px'
      }"
    ></div>

    <!-- INNER DOT (Always Center) -->
    <div 
      ref="cursorInner"
      class="fixed top-0 left-0 bg-white rounded-full transition-all duration-300 ease-out"
      :class="[
        (isMagnetic || isVanish) ? 'opacity-0' : 'opacity-100',
        clickState ? 'scale-50' : ''
      ]"
      style="width: 8px; height: 8px; margin-left: -4px; margin-top: -4px;"
    ></div>

  </div>
</template>

<style scoped>
/* Ensure pure visibility */
* {
    pointer-events: none;
    user-select: none;
}
</style>
