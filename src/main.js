import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/styles/App.scss'
Vue.config.productionTip = false
import { firestorePlugin } from 'vuefire'
import './config'
import moment from 'moment'
moment.locale('fr')
import VueMoment from 'vue-moment'
Vue.use(VueMoment, {
  moment,
})
Vue.use(firestorePlugin)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
