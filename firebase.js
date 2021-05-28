import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyAjfrHVeOu9ba9gi5_-7mPZXCrlRyrbzqI",
    authDomain: "reactcart-70dfc.firebaseapp.com",
    projectId: "reactcart-70dfc",
    storageBucket: "reactcart-70dfc.appspot.com",
    messagingSenderId: "714032643245",
    appId: "1:714032643245:web:2bb77ef338e4b46a845a24"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth } ;
export default firebase ;