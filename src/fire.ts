// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app'
import {getAnalytics} from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDkv9dziQmgFdp6AUwAPYH137P1LizSlm8',
  authDomain: 'cookbook-sperr.firebaseapp.com',
  projectId: 'cookbook-sperr',
  storageBucket: 'cookbook-sperr.firebasestorage.app',
  messagingSenderId: '323170109507',
  appId: '1:323170109507:web:d334e754f44aa792796cf6',
  measurementId: 'G-9YGEHK44GX'
}

// Initialize Firebase
const fire = initializeApp(firebaseConfig)
const analytics = getAnalytics(fire)

export {analytics}
export default fire
