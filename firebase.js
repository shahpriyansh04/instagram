import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAizMaGXWrZbwdn-EPounzodyAVIW-GFrc",

  authDomain: "instagram-8ee54.firebaseapp.com",

  projectId: "instagram-8ee54",

  storageBucket: "instagram-8ee54.appspot.com",

  messagingSenderId: "540357095613",

  appId: "1:540357095613:web:88b28bf4318c26718207d4",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();
const auth = getAuth();
export { app, db, storage, auth };
