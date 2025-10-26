import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { useAuth } from './composables/useAuth'
import './style.css'

const app = createApp(App)

// Initialize auth state
const auth = useAuth()
auth.init()

app.use(router)
app.mount('#app')