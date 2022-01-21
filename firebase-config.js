import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAVOWZ8oUIca6Px4JpON2rXn9PSmO-qKOs",
  authDomain: "blogs-c34eb.firebaseapp.com",
  projectId: "blogs-c34eb",
  storageBucket: "blogs-c34eb.appspot.com",
  messagingSenderId: "106811875937",
  appId: "1:106811875937:web:d12987bca775e2d93d8020"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);