import type {
  Query,
  DocumentData,
  QuerySnapshot,
  Firestore,
  CollectionReference,
} from "@firebase/firestore";
import { addDoc, collection } from "@firebase/firestore";
import { auth, db, signInWithEmailAndPassword } from "../api/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import type { ApiUser } from "./ApiUser";
import { deleteDoc, doc } from "firebase/firestore";
import { Alert } from "react-native";
export class UserCaller {
  constructor(
    public readonly collection: (
      firestore: Firestore,
      path: string,
      ...pathSegments: string[]
    ) => CollectionReference<DocumentData>,
    public readonly getDocs: (
      query: Query<DocumentData>,
    ) => Promise<QuerySnapshot<DocumentData>>,
    public readonly db: Firestore,
  ) {}

  async createUser(
    email: string,
    password: string,
    userName: string,
  ): Promise<ApiUser> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      if (user) {
        await updateProfile(user, { displayName: userName });
        const usersCollection = collection(db, "users");
        await addDoc(usersCollection, {
          uid: user.uid,
          email: email,
          userName: userName,
        });
        return { id: user.uid, name: userName, email: email };
      } else {
        throw new Error("Error creating user");
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  async loginUser(email: string, password: string): Promise<ApiUser> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      return {
        id: user.uid,
        name: user.displayName!,
        email: user.email!,
      };
    } catch (error) {
      console.error("Error signing in:", error);
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

  async deleteAccount(userId: string): Promise<void> {
    const user = getAuth().currentUser;

    if (user && user.uid === userId) {
      try {
        // Delete the user from the Firestore collection
        const userDoc = doc(this.db, "users", userId);
        await deleteDoc(userDoc);

        await user.delete().then(() => {
          Alert.alert(
            "Successfully deleted user",
            "We hope to see you soon...",
          );
        });

        console.log(userId);
      } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
      }
    } else {
      console.error("No authenticated user found or user ID does not match");
    }
  }
}
