import { SIGN_IN, SIGN_OUT } from "./types";
import { auth, db, firestore } from "../../firebase";

const defaultUserAvatar =
  "https://firebasestorage.googleapis.com/v0/b/vue-projects-89c61.appspot.com/o/avatars%2Fdefault-user-avater.png?alt=media&token=55e5edb1-e550-4161-8ee0-3e72d2d2a20f";

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

export const signUp = (userAuthInfo) => async (dispatch) => {
  const authUser = await auth.createUserWithEmailAndPassword(
    userAuthInfo.email,
    userAuthInfo.password
  );

  const displayName = `${userAuthInfo.firstname} ${userAuthInfo.surname}`;
  const newUser = {
    email: userAuthInfo.email,
    firstname: userAuthInfo.firstname,
    surname: userAuthInfo.surname,
    displayName,
    avatar: defaultUserAvatar,
  };

  await db
    .collection("users")
    .doc(authUser.user.uid)
    .set({
      ...newUser,
      created_at: firestore.FieldValue.serverTimestamp(),
    });

  dispatch({ type: SIGN_IN, payload: { id: authUser.user.uid, ...newUser } });
};
