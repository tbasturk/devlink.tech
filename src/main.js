import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/services/util/AxiosInterceptor'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


library.add(fas)
Vue.component('FontAwesomeIcon', FontAwesomeIcon)
Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
