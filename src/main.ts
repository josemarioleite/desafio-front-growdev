import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi'
  }
})

createApp(App)
    .use(vuetify)
    .use(router)
    .mount('#app')
