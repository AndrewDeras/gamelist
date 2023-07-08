import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyA_7MMc10njhyGXAobsXXk9MojtU_lVMQw",
  authDomain: "gamelist-4fd3d.firebaseapp.com",
  projectId: "gamelist-4fd3d",
  storageBucket: "gamelist-4fd3d.appspot.com",
  messagingSenderId: "539911300899",
  appId: "1:539911300899:web:641e9c7a0c79405d38ce96"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };