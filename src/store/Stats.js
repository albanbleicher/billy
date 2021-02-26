import 'firebase/firestore'
import 'firebase/auth'
import { db } from '../config'
export default {
  namespaced: true,
  state: {
    devis_count: 0,
    clients_count: 0,
    factures_count: 0
  },
  getters: {
    devis(state) {
      return state.devis_count
    },
    factures(state) {
      return state.factures_count
    },
    clients(state) {
      return state.clients_count
    }
  },
  mutations: {
    SET_DEVIS_COUNT(state, value) {
      state.devis_count = value
    },
    SET_FACTURES_COUNT(state, value) {
      state.factures_count = value
    },
    SET_CLIENTS_COUNT(state, value) {
      state.clients_count = value
    }
  },
  actions: {
    getStats({ commit }) {
      const id = this.getters['Auth/currentUser'].id
      let devis = []
      let factures = []
      let clients = []
      db.collection('devis')
        .where('entreprise.id', '==', id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(item => {
            let doc = {
              data: item.data(),
              id: item.id
            }
            doc.data.id = item.id
            devis.push(doc)
          })
        })
      db.collection('clients')
        .where('entreprise.id', '==', id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(item => {
            let doc = {
              data: item.data(),
              id: item.id
            }
            doc.data.id = item.id
            clients.push(doc)
          })
        })
      db.collection('factures')
        .where('entreprise.id', '==', id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(item => {
            let doc = {
              data: item.data(),
              id: item.id
            }
            doc.data.id = item.id
            clients.push(doc)
          })
        })
      commit('SET_DEVIS_COUNT', devis.length)
      commit('SET_FACTURES_COUNT', factures.length)
      commit('SET_CLIENTS_COUNT', clients.length)
    }
  }
}
