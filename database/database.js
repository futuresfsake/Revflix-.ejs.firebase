// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDt0k-2C2OAk_COoEjwZrmF6xc76chCPRE",
  authDomain: "webdev1-2b3a5.firebaseapp.com",
  projectId: "webdev1-2b3a5",
  storageBucket: "webdev1-2b3a5.appspot.com",
  messagingSenderId: "743091892882",
  appId: "1:743091892882:web:706fd6059fdc3ea402ac4b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// export default db;