import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyDLPmHqXYSCjTvgeSQDmd9ZQ6373vYeADE",
    authDomain: "vue-store-76307.firebaseapp.com",
    projectId: "vue-store-76307",
    storageBucket: "vue-store-76307.appspot.com",
    messagingSenderId: "822136771627",
    appId: "1:822136771627:web:057380f9542f4c1f58066e"
  };
  // Initialize Firebase
  const Firebase = initializeApp(firebaseConfig);
  const db = getFirestore(Firebase);
  export default db