import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: 'jammusik-dc856.firebaseapp.com',
  projectId: 'jammusik-dc856',
  storageBucket: 'jammusik-dc856.appspot.com',
  messagingSenderId: '952211103393',
  appId: '1:952211103393:web:0aee3f8f7fcc8f62c05ae0',
  measurementId: 'G-591ZJQ8TPY',
};

// init firebase
const app = initializeApp(firebaseConfig);
// init services
const db = getFirestore(app);

const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, signInWithEmailAndPassword, storage };
