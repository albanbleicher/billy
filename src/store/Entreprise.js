import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
import { db } from '../config'
export default {
  namespaced: true,
  state: {
    current: null,
    logo: null
  },
  getters: {
    currentEntreprise(state) {
      return state.current
    },
    entrepriseLogo(state) {
      return state.logo
    }
  },
  mutations: {
    SET_CURRENT(state, data) {
      state.current = data
    },
    SET_LOGO(state, url) {
      state.logo = url
    },
    GG(data) {
      console.log('ok', data)
    }
  },
  actions: {
    getCurrentEntreprise({ commit }) {
      return new Promise((resolve, reject) => {
        const user = this.getters['Auth/currentUser']
        db.collection('entreprises')
          .doc(user.entreprise)
          .get()
          .then(doc => {
            commit('SET_CURRENT', doc.data())
            resolve()
          })
          .catch(e => {
            reject(e)
          })
      })
    },
    getLogo({ commit }) {
      const entreprise = this.getters['Auth/currentUser'].entreprise
      firebase
        .storage()
        .ref('logos/' + entreprise)
        .getDownloadURL()
        .then(response => {
          commit('SET_LOGO', response)
        })
        .catch(() => {
          commit('SET_LOGO', null)
        })
    },
    updateEntreprise({ commit }, data) {
      commit('GG', 'gg')
      const image = data.img
      delete data.img
      const entreprise = this.getters['Auth/currentUser'].entreprise
      return new Promise((resolve, reject) => {
        if (image) {
          const root = firebase.storage().ref()
          const ref = root.child('logos/' + entreprise)
          ref.put(image).then(snapshot => {
            console.log(snapshot)
            console.log('Uploaded a blob or file!')
          })
        }
        db.collection('entreprises')
          .doc(entreprise)
          .set(data)
          .then(() => {
            this.dispatch('Entreprise/getCurrentEntreprise')
            resolve()
          })
          .catch(e => reject(e))
      })
    }
  }
}
