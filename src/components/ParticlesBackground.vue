<script setup>
import { useDark } from '@vueuse/core'
import { computed } from 'vue'

const isDark = useDark()

const options = computed(() => ({
  particles: {
    number: {
      value: 62,
      density: {
        enable: true,
        area: 800
      }
    },
    color: {
      value: isDark.value ? "#ffffff" : "#1f2937"
    },
    shape: {
      type: "circle"
    },
    opacity: {
      value: 0.4,
      random: true,
      animation: {
        enable: true,
        speed: 4,
        minimumValue: 0.1,
        sync: false,
        destroy: "none"
      }
    },
    size: {
      value: 2.9,
      random: true,
      animation: {
        enable: false,
        speed: 4,
        minimumValue: 0.3,
        sync: false
      }
    },
    links: {
      enable: false,
      distance: 150,
      color: isDark.value ? "#ffffff" : "#1f2937",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 1,
      direction: "none",
      random: true,
      straight: false,
      outModes: {
        default: "out"
      },
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 600
      }
    }
  },
  interactivity: {
    detectsOn: "window",
    events: {
      onHover: {
        enable: true,
        mode: "bubble"
      },
      onClick: {
        enable: true,
        mode: "repulse"
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 400,
        links: {
          opacity: 1
        }
      },
      bubble: {
        distance: 250,
        size: 0,
        duration: 2,
        opacity: 0,
        speed: 3
      },
      repulse: {
        distance: 400,
        duration: 0.4
      },
      push: {
        quantity: 4
      },
      remove: {
        quantity: 2
      }
    }
  },
  detectRetina: true
}))
</script>

<template>
  <vue-particles
    :key="isDark ? 'dark' : 'light'"
    id="particles-js"
    class="fixed inset-0 pointer-events-none z-0"
    :options="options"
  />
</template>
