import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import "./assets/iconfont/iconfont.js"
import './assets/iconfont/remixicon.css'
import 'tippy.js/themes/light-border.css';
import router from './router'
import VueTippy from 'vue-tippy'
const app = createApp(App)
app.use(router)
app.use(VueTippy, {
    // theme: 'light', 'light-border', 'material', 'translucent'
    defaultProps: {theme: 'light'}
})
app.mount('#app')
