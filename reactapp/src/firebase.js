import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const app = firebase.initializeApp({
    apiKey: "AIzaSyCW-aPK0VLnWPFIPEsD1tvUPI-0-N-UQm0",

  authDomain: "autho-development-921dc.firebaseapp.com",

  projectId: "autho-development-921dc",

  storageBucket: "autho-development-921dc.appspot.com",

  messagingSenderId: "98435081",

  appId: "1:98435081:web:31a02ac8e9abb7cacf38d8"


})
export const auth =app.auth()
export default app