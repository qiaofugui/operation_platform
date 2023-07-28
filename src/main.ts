import { createApp } from 'vue'
import App from './App.vue'

import '@/styles/index.scss'

import 'virtual:svg-icons-register'

import globalComponent from './components/index'

import router from './router'

import pinia from './store'

import 'element-plus/theme-chalk/el-loading.css'
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-notification.css'
import 'element-plus/theme-chalk/el-message-box.css'
import 'element-plus/theme-chalk/el-drawer.css'

const app = createApp(App)

app.use(globalComponent)

app.use(router)

app.use(pinia)

app.mount('#app')
