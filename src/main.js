import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/style.css'

import axios from 'axios'

// axios.defaults.withCredentials = true

const app = createApp(App)

app.use(router)

app.mount('#app')
