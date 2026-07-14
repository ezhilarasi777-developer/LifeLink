// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfKt5yMqVuIDOFc04Gd5aetX5ibqEKJZ8",
  authDomain: "lifelink-740ea.firebaseapp.com",
  projectId: "lifelink-740ea",
  storageBucket: "lifelink-740ea.firebasestorage.app",
  messagingSenderId: "697998659107",
  appId: "1:697998659107:web:68220d42c74872f6aa6b96",
  measurementId: "G-03EN5D3MPF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
   db,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc
 };