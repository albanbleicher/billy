import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './Auth'
import Stats from './Stats'
import Entreprise from './Entreprise'
import Clients from './Clients'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Auth,
    Stats,
    Entreprise,
    Clients
  }
})
