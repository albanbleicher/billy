import 'firebase/firestore'
import 'firebase/auth'
import { db } from '../config'
export default {
  namespaced: true,
  state: {
    list: []
  },
  getters: {
    clientsList(state) {
      return state.list
    }
  },
  mutations: {
    SET_LIST(state, data) {
      state.list = data
    },
    GG(data) {
      console.log(data)
    }
  },
  actions: {
    registerClient({ commit }, data) {
      commit('GG', 'gg')

      return new Promise((resolve, reject) => {
        db.collection('clients')
          .add(data)
          .then(doc => {
            resolve(doc)
          })
          .catch(e => {
            reject(e)
          })
      })
    },
    async getClientsList({ commit }) {
      let list = []
      const response = await db.collection('clients').get()
      response.docs.forEach(doc => {
        const search_values =
          doc.data().nom +
          ' ' +
          doc.data().prenom +
          ' ' +
          doc.data().mail +
          ' ' +
          doc.data().telephone
        const search_label =
          doc.data().nom.toUpperCase() + ' ' + doc.data().prenom
        list.push({
          id: doc.id,
          search_values,
          search_label,
          ...doc.data()
        })
      })
      commit('SET_LIST', list)
    },
    getClient({ commit }, id) {
      commit('GG', 'gg')
      return new Promise((resolve, reject) => {
        db.collection('clients')
          .where(
            'entreprise',
            '==',
            this.getters['Auth/currentUser'].entreprise
          )
          .doc(id)
          .get()
          .then(response => {
            resolve(response)
          })
          .catch(e => {
            reject(e)
          })
      })
    }
  }
}
