import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAHVTm0ND67_HgBosomhxcGvFi_ON3dGes",
    authDomain: "deliveryapp-42143.firebaseapp.com",
    databaseURL: "https://deliveryapp-42143-default-rtdb.firebaseio.com",
    projectId: "deliveryapp-42143",
    storageBucket: "deliveryapp-42143.appspot.com",
    messagingSenderId: "954016264953",
    appId: "1:954016264953:web:172e22d2b07acefabd6828",
    measurementId: "G-FST4R2H3JD"
  };


  const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

  const firestore = getFirestore(app);
  const storage = getStorage(app);

  export { app, firestore, storage };