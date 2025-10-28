// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHNlEnQIwp6jWS0H6IyHmUDF1zG3Gnr7A",
  authDomain: "clase-app-moviles.firebaseapp.com",
  projectId: "clase-app-moviles",
  storageBucket: "clase-app-moviles.firebasestorage.app",
  messagingSenderId: "210688689451",
  appId: "1:210688689451:web:e0d1dcdf6dcdfd32dfb16e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);