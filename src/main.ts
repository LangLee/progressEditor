import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import "./assets/iconfont/iconfont.js"
// import './assets/iconfont/remixicon.css'
import 'remixicon/fonts/remixicon.css'
import 'tippy.js/themes/light.css';
// import 'tippy.js/themes/light-border.css';
// import 'tippy.js/themes/translucent.css';
// import 'tippy.js/themes/material.css';

// import 'tippy.js/animations/scale.css'
// import 'tippy.js/animations/perspective.css'
// import 'tippy.js/animations/shift-away.css'
// import 'tippy.js/animations/shift-toward.css'
import 'tippy.js/dist/svg-arrow.css'
import router from './router'
import VueTippy from 'vue-tippy'
import {roundArrow} from 'tippy.js'
const app = createApp(App)
app.use(router)
app.use(VueTippy, {
    // theme: 'light', 'light-border', 'material', 'translucent'
    defaultProps: { 
        theme: 'light',
        arrow: roundArrow 
    }
})
app.mount('#app')
