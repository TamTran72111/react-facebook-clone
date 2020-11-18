import { combineReducers } from "redux";
import auth from "./auth";
import loading from "./loading";
import posts from "./posts";

export default combineReducers({
  auth,
  loading,
  posts,
});
