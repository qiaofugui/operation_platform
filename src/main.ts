import { createApp } from 'vue'
import App from './App.vue'

import '@/styles/index.scss'

import 'virtual:svg-icons-register'

import globalComponent from './components/index'

const app = createApp(App)

app.use(globalComponent)

app.mount('#app')
