import { doc, updateDoc, getDoc, setDoc } from "@firebase/firestore";
import type {
  Firestore,
  CollectionReference,
  Query,
  DocumentData,
  QuerySnapshot,
} from "@firebase/firestore";
import { db } from "../api/firebaseConfig";
import type { ApiUserInfo } from "./ApiUserInfo";

export class UserInfoCaller {
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

  async setCurrentUserInfo(
    userId: string,
    location: string,
    skills: string,
    instrument: string,
  ): Promise<ApiUserInfo> {
    const userRef = doc(db, "userInfo", userId);
    const userInfo = {
      location: location || "",
      skills: skills || "",
      instrument: instrument || "",
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

  async getUserInfo(userId: string): Promise<ApiUserInfo | null> {
    const userRef = doc(this.db, "userInfo", userId);
    const userSnapshot = await getDoc(userRef);
    if (userSnapshot.exists()) {
      return userSnapshot.data() as ApiUserInfo;
    } else {
      return null;
    }
  }
}
