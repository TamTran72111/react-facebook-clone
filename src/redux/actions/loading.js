import { LOADED } from "./types";

export const finishedLoading = () => (dispatch) => {
  dispatch({ type: LOADED });
};
