import firebase from 'firebase/app';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore , collection , getDocs } from "firebase/firestore";

const firebaseConfig = {

  apiKey: "AIzaSyD8c_db8xUuWf1RmfuNlvp2Ejh2Em5Ril4",

  authDomain: "depanagedz-33abc.firebaseapp.com",

  projectId: "depanagedz-33abc",

  storageBucket: "depanagedz-33abc.appspot.com",

  messagingSenderId: "212174765374",

  appId: "1:212174765374:web:76f01699bb7ecc5ddc806f",

  measurementId: "G-VL05HZT3LE"

};




// Initialize Firebase
export const FIREEBASE_APP = initializeApp(firebaseConfig);
export const FIREEBASE_ANALYTICS = getAnalytics(FIREEBASE_APP);
export const FirebaseAuth = getAuth(FIREEBASE_APP);
//Firestore
export const db = getFirestore();


