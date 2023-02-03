import {createApp} from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { createStore } from './store'

import { checkValue } from './assets/js/utils'

//eslint-disable-next-line
import swal from 'sweetalert'

const app = createApp(App)

const store = createStore(app)

const rootApp = app.use(store)


app.config.globalProperties.hostname = "https://localhost/api/"
// app.config.globalProperties.hostname = "https://10.10.208.197/api/"
// app.config.globalProperties.hostname = "https://os-beyond.at/api/"

app.config.globalProperties.checkValue = checkValue

app.config.globalProperties.entity_symbols = Object.freeze({
    PLAYER: ">",
    WALL: "#",
    CORN: "*"
})

rootApp.use(router)
    .mount('#app')


