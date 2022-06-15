// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "next-twitter-clone-5de0a.firebaseapp.com",
    projectId: "next-twitter-clone-5de0a",
    storageBucket: "next-twitter-clone-5de0a.appspot.com",
    messagingSenderId: "640231425270",
    appId: "1:640231425270:web:b96bb9763dd8ff8b3b18d7"
};

// Initialize Firebase
const app =!getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };