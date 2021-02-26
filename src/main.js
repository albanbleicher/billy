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
import Toasted from 'vue-toasted'
import DatePicker from 'v-calendar/lib/components/date-picker.umd'
Vue.component('date-picker', DatePicker)
import VGrid from '@revolist/vue-datagrid'
Vue.component('v-grid', VGrid)
Vue.use(VueMoment, {
  moment
})
Vue.use(firestorePlugin)
Vue.use(Toasted)
Vue.toasted.register('success', 'Ok !', {
  type: 'success',
  duration: 5000,
  position: 'top-center'
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
