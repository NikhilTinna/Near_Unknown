// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase,ref } from 'firebase/database';
import '@firebase/database';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCPBqXsQd_2UvuovxQ14etMjLzwtYvXJXo",
  authDomain: "nearunknown-80dfd.firebaseapp.com",
  projectId: "nearunknown-80dfd",
  storageBucket: "nearunknown-80dfd.appspot.com",
  messagingSenderId: "1081593730481",
  appId: "1:1081593730481:web:457322f54c1f6e972b9990",
  measurementId: "G-9LMWHW57SG"
};


export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getDatabase(firebaseApp);