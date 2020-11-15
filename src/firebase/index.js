import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

import firebaseConfig from "./config";

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();
export const auth = firebaseApp.auth();
export const firestore = firebase.firestore;
export const storage = firebaseApp.storage();
