// src/firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJjuw-bbZv1h8KIylIkFiSu5sPfxmZt4g",
  authDomain: "images-76f3b.firebaseapp.com",
  projectId: "images-76f3b",
  storageBucket: "images-76f3b.firebasestorage.app",
  messagingSenderId: "906203051920",
  appId: "1:906203051920:web:5c4fe47ee0866449bb2515",
  measurementId: "G-7ETFTSWL2G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export { storage, analytics };
