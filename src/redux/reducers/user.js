import { FETCH_USER } from '../actions/types';

const INTIAL_STATE = {
  users: null,
};

// eslint-disable-next-line
export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER:
      return { user: action.payload };

    default:
      return state;
  }
};
