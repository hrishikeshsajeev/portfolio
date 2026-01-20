<script setup>
defineProps({
  loading: Boolean
})
</script>

<template>
  <Transition name="preloader">
    <div v-if="loading" class="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div class="flex flex-col items-center">
        <!-- Animated Logo or Spinner -->
        <div class="relative w-16 h-16">
          <div class="absolute inset-0 border-4 border-surface rounded-full"></div>
          <div class="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
        </div>
        <div class="mt-4 text-primary font-bold tracking-widest text-sm uppercase">Loading</div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.preloader-enter-active,
.preloader-leave-active {
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.preloader-leave-to {
  opacity: 0;
  transform: scale(1.1);
  pointer-events: none;
}
</style>
