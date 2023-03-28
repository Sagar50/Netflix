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

  export const addUserDetails = async ({ isKid, lang, rating, isAutoEp, isAutoPre }) => {
    
    const user = auth.currentUser;

    if (!user) return;
    const userRef = db.doc(`users/${user.uid}`);  
    userRef.update({
      IsKid: isKid,
      Lang: lang,
      Rating: rating,
      IsAutoEp: isAutoEp,
      IsAutoPre: isAutoPre
    });
  };

  export const addToMyList = async (movie) => {
    if (!auth.currentUser) return;
    const user = auth.currentUser;
    db.collection(`users`).doc(`${user.uid}`).collection("my-movie-list").add(movie);
  }

  export const removeFromList = async (movie) => {
    if (!auth.currentUser) return;
    const movieId = movie.id;
    var toDel = [];

    db.collection("users").doc(`${auth.currentUser.uid}`).collection("my-movie-list").get()
    .then(querySnapshot => {
      querySnapshot.forEach((doc) => {
        const movieDocId = doc.data().id;
        if(movieDocId === movieId){
          toDel.push(doc.ref);
        };
      });
    }).then(() => {
      for (var i = 0; i < toDel.length; i++){
        toDel[i].delete();
      } 
    })
  }

  export const checkList = async (movie) => {
    if (!auth.currentUser) return;

    const movieId = movie.id;

    db.collection("users").doc(`${auth.currentUser.uid}`).collection("my-movie-list").get()
    .then(querySnapshot => {
      querySnapshot.forEach((doc) => {
        const movieDocId = doc.data().id;
        if(movieDocId === movieId){
          console.log("returning true");
          return true;
        } else {
          console.log("returning false");
          return false;
        };
      });
    })
  }
  
  export { auth, db };