import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: 'jammusikapp.firebaseapp.com',
  projectId: 'jammusikapp',
  storageBucket: 'jammusikapp.appspot.com',
  messagingSenderId: '1094014992696',
  appId: '1:1094014992696:web:6201a6d688c5cb06af01cd',
  measurementId: 'G-PP0BVZML2S',
};

// init firebase
const app = initializeApp(firebaseConfig);
// init services
const db = getFirestore(app);

const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, signInWithEmailAndPassword, storage };
