import type {
  Query,
  DocumentData,
  QuerySnapshot,
  Firestore,
  CollectionReference,
} from "@firebase/firestore";
import { addDoc, collection } from "@firebase/firestore";
import { auth, db } from "../api/firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import type { ApiUser, ApiUserInfo } from "./ApiUser";
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
}
