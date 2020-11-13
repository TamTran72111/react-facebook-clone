import { SIGN_IN, SIGN_OUT } from "./types";
import { auth, db } from "../../firebase";

export const signIn = (userAuthInfo) => async (dispatch) => {
  const authUser = await auth.signInWithEmailAndPassword(
    userAuthInfo.email,
    userAuthInfo.password
  );
  const user = await db.collection("users").doc(authUser.user.uid).get();
  dispatch({ type: SIGN_IN, payload: { id: user.id, ...user.data() } });
};

export const signOut = () => (dispatch) => {
  auth.signOut();
  dispatch({ type: SIGN_OUT });
};
