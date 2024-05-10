// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
import  * as firestore from "firebase/firestore";
import * as firebase_auth from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxY9GbL1JDxp88aOCPLu9vEsd4weZtuoQ",
  authDomain: "focus-flow-app.firebaseapp.com",
  projectId: "focus-flow-app",
  storageBucket: "focus-flow-app.appspot.com",
  messagingSenderId: "424080342310",
  appId: "1:424080342310:web:9b170367beac0dcd3455e7",
  measurementId: "G-Q5Y2SJC234",
};

const app = firebase.initializeApp(firebaseConfig);
// initialize Firebase Auth for that app immediately
const auth = firebase_auth.initializeAuth(app, {
  persistence: firebase_auth.getReactNativePersistence(ReactNativeAsyncStorage),
});
const database = firestore.getFirestore();
export { app, auth, database };
