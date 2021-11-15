// Import the functions you need from the SDKs you need
import * as firebase from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDTtqNR8Xi01LkzZBaQzMefEGU98KFohd0',
  authDomain: 'social-app-9923d.firebaseapp.com',
  projectId: 'social-app-9923d',
  storageBucket: 'social-app-9923d.appspot.com',
  messagingSenderId: '1020358149478',
  appId: '1:1020358149478:web:ab2d6d261a195c5c5cb4a7',
  measurementId: 'G-DNFPGRFKB8',
}

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig)

const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export { auth, db, storage }
