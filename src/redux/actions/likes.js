import { db } from "../../firebase";
import { FETCH_LIKES } from "./types";

export const fetchLikes = async (dispatch, userId) => {
  const likes = await db
    .collection("likes")
    .where("userId", "==", userId)
    .get();

  dispatch({
    type: FETCH_LIKES,
    payload: likes.docs.map((like) => ({ id: like.id, ...like.data() })),
  });
};
