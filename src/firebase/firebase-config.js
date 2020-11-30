import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = { //desde el config de la página Firebase en General firabase snippet
    apiKey: "AIzaSyA2ztptACdnCguWIYBx23X_Dm5UyN7PGds",//apiKey
    authDomain: "pulsoapp-34801.firebaseapp.com", //authDomain
    databaseURL: "https://pulsoapp-34801.firebaseio.com",//DatabaseURL
    projectId: "pulsoapp-34801", //projectId
    storageBucket: "pulsoapp-34801.appspot.com",//storageBucket
    messagingSenderId: "767898417151", //messaggingSenderId
    appId: "1:767898417151:web:7b894d5e56620cb77dd9ca"//appID
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)
  //lo de arribar lo tomé de firebase

   // la BD a usar y grabar:
  const db = firebase.firestore();
  //el out provider para validar en google
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  export {
      db,
      googleAuthProvider,
      firebase
  }