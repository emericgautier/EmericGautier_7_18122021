import { createApp } from 'vue'
import { VueCookieNext } from 'vue-cookie-next'

import App from './App.vue'

import router from './router'
import store from './store'

import '@fortawesome/fontawesome-free/css/all.css'

createApp(App).use(store).use(router).use(VueCookieNext).mount('#app')

