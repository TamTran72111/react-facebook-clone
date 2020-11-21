import { combineReducers } from "redux";
import auth from "./auth";
import loading from "./loading";
import posts from "./posts";
import likes from "./likes";
import comments from "./comments";

export default combineReducers({
  auth,
  loading,
  posts,
  likes,
  comments,
});
