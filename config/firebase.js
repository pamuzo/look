import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import {
  initializeAuth,
  getAuth,
  getReactNativePersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyC2IpcyFHXacbviIhFBog_xfitIJPdyXx0",
  authDomain: "look-257ec.firebaseapp.com",
  projectId: "look-257ec",
  storageBucket: "look-257ec.appspot.com",
  messagingSenderId: "799250744651",
  appId: "1:799250744651:web:e75146d29cf2cf9e1354ce",
};

// Initialize Firebase
let app;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

initializeApp(firebaseConfig);
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
// const auth = getAuth();
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const storage = getStorage();

export { db, auth, storage };
