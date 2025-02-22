import firebase from "firebase/compat/app"
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseApp = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
});
console.log("API Key:", process.env.REACT_APP_FIREBASE_API_KEY);
console.log("Project ID:", process.env.REACT_APP_PROJECT_ID);

const db = firebaseApp.firestore();
const auth = firebase.auth();

console.log("Firebase App:", firebaseApp);
console.log("Firestore DB:", db);
export {db, auth};