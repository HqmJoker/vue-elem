import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css

import { store } from './store/index.js'
import router from './router/index.js'
import './permission.js'

createApp(App)
.use(store)
.use(router)
.use(ElementPlus)
.mount('#app')
