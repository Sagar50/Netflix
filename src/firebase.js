import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyAmFyhYez9YE5kQcCt1TUs-dGQ9Mmx6T_o",
    authDomain: "netflix-45e0d.firebaseapp.com",
    projectId: "netflix-45e0d",
    storageBucket: "netflix-45e0d.appspot.com",
    messagingSenderId: "189944988847",
    appId: "1:189944988847:web:269f1eb6556c3b96e1805a"
  };

// Use this to initialize the firebase App
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  // Use these for db & auth
  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export { auth, db };