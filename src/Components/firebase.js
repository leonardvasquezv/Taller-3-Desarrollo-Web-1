import firebase from "firebase/app";
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCg1C8v26YdCY9pVNlLeL3srDG-ds1Z_kc",
  authDomain: "taller3-f3f9f.firebaseapp.com",
  projectId: "taller3-f3f9f",
  storageBucket: "taller3-f3f9f.appspot.com",
  messagingSenderId: "275627251154",
  appId: "1:275627251154:web:8daedaf384fdb76dc7a40b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export {firebase}