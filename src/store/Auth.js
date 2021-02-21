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
      email: ''
    },
    user: null,
    loginError: null
  },
  getters: {
    userData(state) {
      return state.userData
    },
    currentUserId(state) {
      return state.user.uid
    }
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
    SET_USER_DATA(state, data) {
      state.userData = data
    },
    SET_LOGIN_ERROR(state, message) {
      state.loginError = message
    }
  },
  actions: {
    async login({ commit }, data) {
      try {
        const response = await firebase
          .auth()
          .signInWithEmailAndPassword(data.mail, data.password)
        const user = {
          email: response.user.email,
          uid: response.user.uid
        }
        commit('SET_USER', user)

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
      firebase.auth().signOut()
      commit('SET_USER', null)
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
    }
  }
}
