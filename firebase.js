// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import dotenv from 'dotenv'

dotenv.config()
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
<<<<<<< HEAD
  apiKey: "",
=======
  apiKey: process.env.REACT_APP_API_KEY,
>>>>>>> 1063542 ({Enh}:IMplemented the feature to get the items from the firebase database)
  authDomain: "pantryapp-d1628.firebaseapp.com",
  projectId: "pantryapp-d1628",
  storageBucket: "pantryapp-d1628.appspot.com",
  messagingSenderId: "1018101482940",
<<<<<<< HEAD
  appId: "",
=======
  appId: process.env.REACT_APP_ID,
>>>>>>> 1063542 ({Enh}:IMplemented the feature to get the items from the firebase database)
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)

export {app,firestore}
