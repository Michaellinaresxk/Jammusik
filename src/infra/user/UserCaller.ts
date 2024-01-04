import type {
  Query,
  DocumentData,
  QuerySnapshot,
  Firestore,
  CollectionReference,
} from '@firebase/firestore';
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  getDoc,
  setDoc,
} from '@firebase/firestore';
import { auth, db, signInWithEmailAndPassword } from '../api/firebaseConfig';
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import UserInfo from '../../domain/user/UserInfo';
import type { UserInfoProperties } from '../../types/properties';
import type { ApiUser, ApiUserInfo } from './ApiUser';
export class UserCaller {
  constructor(
    public readonly collection: (
      firestore: Firestore,
      path: string,
      ...pathSegments: string[]
    ) => CollectionReference<DocumentData>,
    public readonly getDocs: (
      query: Query<DocumentData>
    ) => Promise<QuerySnapshot<DocumentData>>,
    public readonly db: Firestore
  ) {}

  async createUser(
    email: string,
    password: string,
    userName: string
  ): Promise<ApiUser> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (user) {
        await updateProfile(user, { displayName: userName });
        const usersCollection = collection(db, 'users');
        await addDoc(usersCollection, {
          uid: user.uid,
          email: email,
          userName: userName,
        });
        return { id: user.uid, name: userName, email: email };
      } else {
        throw new Error('Error creating user');
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async authWithGoogle(): Promise<ApiUser> {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        const usersCollection = collection(db, 'users');
        const userRef = doc(usersCollection, user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          await setDoc(userRef, {
            uid: user.uid,
            email: user.email,
            userName: user.displayName,
          });
        }

        return {
          id: user.uid,
          name: user.displayName as string,
          email: user.email as string,
        };
      } else {
        throw new Error('Failed to authenticate with Google');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      throw error;
    }
  }

  async authWithFacebook(): Promise<ApiUser> {
    const auth = getAuth();
    const provider = new FacebookAuthProvider();
    provider.addScope('user_birthday');

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        const usersCollection = collection(db, 'users');
        const userRef = doc(usersCollection, user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          await setDoc(userRef, {
            uid: user.uid,
            email: user.email,
            userName: user.displayName,
          });
        }

        return {
          id: user.uid,
          name: user.displayName as string,
          email: user.email as string,
        };
      } else {
        throw new Error('Failed to authenticate with Facebook');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      throw error;
    }
  }

  async loginUser(email: string, password: string): Promise<ApiUser> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      return {
        id: user.uid,
        name: user.displayName!,
        email: user.email!,
      };
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  }

  async getCurrentUser(userId: string): Promise<ApiUser | null> {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user && user.uid === userId) {
      return {
        id: user.uid,
        email: user.email!,
        name: user.displayName!,
      };
    } else {
      return null;
    }
  }

  async logout(): Promise<void> {
    await auth.signOut();
  }

  async setCurrentUserInfo(
    userId: string,
    name: string,
    email: string,
    location: string,
    skills: string,
    instrument: string
  ): Promise<ApiUserInfo> {
    const userRef = doc(db, 'userInfo', userId);
    const userInfo = {
      name: name,
      email: email,
      location: location,
      skills: skills,
      instrument: instrument,
    };
    const userSnapshot = await getDoc(userRef);
    if (!userSnapshot.exists()) {
      // If document doesn't exist, create a new one
      await setDoc(userRef, userInfo);
    } else {
      // If document exist, update
      await updateDoc(userRef, userInfo);
    }
    return { userId: userId, ...userInfo };
  }

  async getCurrentUserInfo(userId: string): Promise<ApiUserInfo | undefined> {
    try {
      const collectionRef = collection(this.db, 'userInfo');
      const docRef = doc(collectionRef, userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data() as UserInfoProperties;
        return UserInfo.fromProperties(data);
      }
    } catch (error) {
      throw new Error(`No user info found: ${error}`);
    }
  }
}
