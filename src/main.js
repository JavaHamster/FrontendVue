import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

const app = createApp(App)
    
const rootApp = app.use(store)

rootApp.use(router)
    .mount('#app')

app.config.globalProperties.hostname = "https://localhost/api/"
