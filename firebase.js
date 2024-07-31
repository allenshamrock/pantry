// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "pantryapp-d1628.firebaseapp.com",
  projectId: "pantryapp-d1628",
  storageBucket: "pantryapp-d1628.appspot.com",
  messagingSenderId: "1018101482940",
  appId: "",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)

export {app,firestore}
