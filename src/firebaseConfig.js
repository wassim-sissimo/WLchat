
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import {getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyD_sxd1GIVDpxAWlKWtKS8bd-NCYs70Ji8",
  authDomain: "wlchat-db3e0.firebaseapp.com",
  projectId: "wlchat-db3e0",
  storageBucket: "wlchat-db3e0.appspot.com",
  messagingSenderId: "572332016606",
  appId: "1:572332016606:web:23a89b32b2f960d966134f",
  measurementId: "G-2GRNVNHS46"
};


const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const dataBase=getFirestore(app)
export const storage=getStorage(app)