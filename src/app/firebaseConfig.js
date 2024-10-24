
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyDsUFi2QeEVzuuY6ZXi6oMt8sWqGix-rCU",
  authDomain: "move-mentor-6aa46.firebaseapp.com",
  projectId: "move-mentor-6aa46",
  storageBucket: "move-mentor-6aa46.appspot.com",
  messagingSenderId: "63884356164",
  appId: "1:63884356164:web:3c005785dd55a1851d6a11",
  measurementId: "G-DH894CXNS1"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db};