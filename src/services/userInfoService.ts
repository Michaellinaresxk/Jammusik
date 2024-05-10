import { UserInfoResource } from "../infra/userInfo/UserInfoResource";
import { UserInfoService } from "../primary/userInfo/index";
import { UserInfoCaller } from "../infra/userInfo/UserInfoCaller";
import { db } from "../infra/api/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const userInfoCaller = new UserInfoCaller(collection, getDocs, db);
const userInfoResource = new UserInfoResource(userInfoCaller);
const userInfoService = new UserInfoService(userInfoResource);

export { userInfoService };
