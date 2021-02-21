import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
// Get a Firestore instance
export const db = firebase
  .initializeApp({
    apiKey: 'AIzaSyA0mSfXpr-_Uz6xUKR1B-cHR7zij1xcvlU',
    authDomain: 'mydevis-b527f.firebaseapp.com',
    databaseURL: 'https://mydevis-b527f.firebaseio.com',
    projectId: 'mydevis-b527f',
    storageBucket: 'mydevis-b527f.appspot.com',
    messagingSenderId: '473644981542',
    appId: '1:473644981542:web:31e6bb67d149692b7675e7',
    measurementId: 'G-C5W2EF0RT8'
  })
  .firestore()

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }

// if using Firebase JS SDK < 5.8.0
db.settings({ timestampsInSnapshots: true })
// users
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(user => {
      resolve(user)
    }, reject)
  })
}
