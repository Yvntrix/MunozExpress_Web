import { getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database"
const firebaseConfig = {

  apiKey: "AIzaSyDOgslSanaSMqnjMW57sZHQnawvLkm5PJs",

  authDomain: "munosxpress.firebaseapp.com",

  databaseURL: "https://munosxpress-default-rtdb.firebaseio.com",

  projectId: "munosxpress",

  storageBucket: "munosxpress.appspot.com",

  messagingSenderId: "666014466943",

  appId: "1:666014466943:web:44f99bd92fa2cd1ed0504a",

  measurementId: "G-V61QCYV97R"

};

export default function StartFirebase(){
  const app = initializeApp(firebaseConfig);
  return getDatabase(app) 
}


  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app)


