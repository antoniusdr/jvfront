import { FETCH_CONTESTS_SUCCESS } from "./actions";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CONTESTS_SUCCESS:
      return [...action.payload];
    default:
      return state;
  }
};
