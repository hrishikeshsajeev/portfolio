import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { MotionPlugin } from '@vueuse/motion'
import router from './router'
import Particles from '@tsparticles/vue3'
import { loadAll } from '@tsparticles/all'

const app = createApp(App)

app.use(MotionPlugin)
app.use(router)
app.use(Particles, {
    init: async (engine) => {
        await loadAll(engine)
    }
})

app.mount('#app')
