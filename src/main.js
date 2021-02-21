import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/styles/App.scss'
Vue.config.productionTip = false
import { firestorePlugin } from 'vuefire'
import './config'
Vue.use(firestorePlugin)
import moment from 'moment'
moment.locale('fr')
new Vue({
  router,
  store,
  moment,
  render: h => h(App)
}).$mount('#app')
