import { FETCH_VOTES } from "./actions";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VOTES:
      return action.payload;
    default:
      return state;
  }
};
