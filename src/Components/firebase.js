import firebase from "firebase/app";
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBrQQ_UPG8E3dtnMYskMwdzu8D0B_mus94",
  authDomain: "test-50805.firebaseapp.com",
  projectId: "test-50805",
  storageBucket: "test-50805.appspot.com",
  messagingSenderId: "1071538730146",
  appId: "1:1071538730146:web:ba803cdbfc3a73bdf253fb"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export {firebase}