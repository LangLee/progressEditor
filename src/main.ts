import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// import "./assets/iconfont/iconfont.js"
import './assets/iconfont/remixicon.css'
import router from './router'
const app = createApp(App)
app.use(router)
app.mount('#app')
