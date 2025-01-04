// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
// import {
//   APIKEY,
//   AUTH_DOMAIN,
//   PROJECT_ID,
//   STORAGE_BUCKET,
//   MESSAGING_SENDER_ID,
//   APP_ID,
//   MEASUREMENT_ID,
// } from '@env';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// const firebaseConfig = {§
//   apiKey: APIKEY,
//   authDomain: AUTH_DOMAIN,
//   projectId: PROJECT_ID,
//   storageBucket: STORAGE_BUCKET,
//   messagingSenderId: MESSAGING_SENDER_ID,
//   appId: APP_ID,
//   measurementId: MEASUREMENT_ID,
// };

const firebaseConfig = {
  apiKey: 'AIzaSyCJb2IUO4Vdbusm59vmNBrx4VW88FPJg6A',
  authDomain: 'jammusik-native.firebaseapp.com',
  projectId: 'jammusik-native',
  storageBucket: 'jammusik-native.firebasestorage.app',
  messagingSenderId: '265931508729',
  appId: '1:265931508729:web:5aac0d9d2bf11d36044b28',
  measurementId: 'G-HHNFQBS1GS',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// init services
const db = getFirestore(app);

const auth = getAuth(app);
const storage = getStorage(app);

export {db, auth, signInWithEmailAndPassword, storage};
