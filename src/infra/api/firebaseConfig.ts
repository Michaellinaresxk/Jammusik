// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// init services
const db = getFirestore(app);

const auth = getAuth(app);
const storage = getStorage(app);

export {db, auth, signInWithEmailAndPassword, storage, sendPasswordResetEmail};
