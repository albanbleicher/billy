import router from '@/router/index'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { db } from '../config'
export default {
  namespaced: true,
  state: {
    userData: {
      prenom: '',
      nom: '',
      email: '',
      entreprise: ''
    },
    currentUser: {
      prenom: '',
      nom: '',
      email: '',
      entreprise: '',
      id: ''
    },
    loginError: null
  },
  getters: {
    userData(state) {
      return state.userData
    },
    loginError(state) {
      return state.loginError
    },
    currentUser(state) {
      return state.currentUser
    }
  },
  mutations: {
    SET_USER_DATA(state, data) {
      state.userData = data
    },
    SET_CURRENT_USER_DATA(state, data) {
      state.currentUser = data
    },
    SET_LOGIN_ERROR(state, message) {
      state.loginError = message
    },
    GG(data) {
      console.log('gg', data)
    }
  },
  actions: {
    async login({ commit }, data) {
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(data.mail, data.password)
        router.push('/app')
      } catch (e) {
        switch (e.code) {
          case 'auth/invalid-email':
            commit('SET_LOGIN_ERROR', "L'adresse mail est invalide")
            break
          case 'auth/invalid-password':
            commit('SET_LOGIN_ERROR', 'Mot de passe incorrect')
            break
          case 'auth/user-not-found':
            commit('SET_LOGIN_ERROR', "Ce compte n'existe pas")
            break
          default:
            commit('SET_LOGIN_ERROR', 'Une erreur est survenue')
            break
        }
      }
    },
    logout({ commit }) {
      commit('SET_USER_DATA', null)
      firebase.auth().signOut()
      router.push('/')
    },
    async getUserData({ commit }, id) {
      db.collection('users')
        .doc(id)
        .get()
        .then(response => {
          commit('SET_USER_DATA', response.data())
        })
        .catch(e => {
          console.log(e)
        })
    },
    getCurrentUser({ commit }) {
      return new Promise((resolve, reject) => {
        let user = firebase.auth().currentUser
        db.collection('users')
          .doc(user.uid)
          .get()
          .then(response => {
            resolve()
            commit('SET_CURRENT_USER_DATA', {
              ...response.data(),
              id: user.uid
            })
          })
          .catch(e => {
            reject()
            console.log(e)
          })
      })
    },
    async register({ commit }, data) {
      commit('GG', 'gg')
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          data.identity.mail,
          data.identity.password
        )
        .then(response => {
          data.identity.avatar =
            'https://eu.ui-avatars.com/api/?name=' +
            data.identity.prenom +
            '+' +
            data.identity.nom
          db.collection('entreprises')
            .add(data.entreprise)
            .then(doc => {
              delete data.identity.password
              data.identity.entreprise = doc.id
              db.collection('users')
                .doc(response.user.uid)
                .set(data.identity)
              router.push('/app')
            })
        })
    }
  }
}
