import {
  CLEANUP_AUTH,
  LISTEN_AUTH,
  LOADED,
  LOADING,
  SIGN_IN,
  SIGN_OUT,
} from "./types";
import { auth, db, firestore } from "../../firebase";
import { fetchLikes } from "./likes";

const defaultUserAvatar =
  "https://firebasestorage.googleapis.com/v0/b/vue-projects-89c61.appspot.com/o/avatars%2Fdefault-user-avater.png?alt=media&token=55e5edb1-e550-4161-8ee0-3e72d2d2a20f";

export const signIn = (userAuthInfo) => async (dispatch) => {
  dispatch({ type: LOADING });
  await auth.signInWithEmailAndPassword(
    userAuthInfo.email,
    userAuthInfo.password
  );
};

export const signOut = () => () => {
  auth.signOut();
};

export const signUp = (userAuthInfo) => async (dispatch) => {
  dispatch({ type: LOADING });
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

export const setupAuthListener = () => (dispatch) => {
  dispatch({ type: LOADING });
  const listener = auth.onAuthStateChanged(async (user) => {
    if (user) {
      // User is signed in, so fetch the user data
      const userData = await db.collection("users").doc(user.uid).get();
      dispatch({
        type: SIGN_IN,
        payload: { id: userData.id, ...userData.data() },
      });
      fetchLikes(dispatch, user.uid);
    } else {
      // No user is signed in, so sign out to clear the data
      dispatch({ type: SIGN_OUT });
    }
    dispatch({ type: LOADED });
  });
  dispatch({ type: LISTEN_AUTH, payload: listener });
};

export const cleanupAuth = () => (dispatch) => {
  dispatch({ type: CLEANUP_AUTH });
};
