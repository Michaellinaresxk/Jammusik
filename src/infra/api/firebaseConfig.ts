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

const firebaseConfig = {
  // apiKey: APIKEY,
  // authDomain: AUTH_DOMAIN,
  // projectId: PROJECT_ID,
  // storageBucket: STORAGE_BUCKET,
  // messagingSenderId: MESSAGING_SENDER_ID,
  // appId: APP_ID,
  // measurementId: MEASUREMENT_ID,
  apiKey: 'AIzaSyA_ARNHIbzAe3JccZc9VDbmwQ5jgZS2iXA',
  authDomain: 'jammusik-dc856.firebaseapp.com',
  databaseURL: 'https://jammusik-dc856-default-rtdb.firebaseio.com',
  projectId: 'jammusik-dc856',
  storageBucket: 'jammusik-dc856.appspot.com',
  messagingSenderId: '952211103393',
  appId: '1:952211103393:web:0aee3f8f7fcc8f62c05ae0',
  measurementId: 'G-591ZJQ8TPY',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// init services
const db = getFirestore(app);

const auth = getAuth(app);
const storage = getStorage(app);

export {db, auth, signInWithEmailAndPassword, storage};
