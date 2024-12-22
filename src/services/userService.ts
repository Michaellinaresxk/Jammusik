import { UserResource } from "../infra/user/UserResource";
import { UserService } from "../primary/user/useCases/index";
import { UserCaller } from "../infra/user/UserCaller";
import { db } from "../infra/api/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const userCaller = new UserCaller(collection, getDocs, db);
const userResource = new UserResource(userCaller);
const userService = new UserService(userResource);

export { userService };
