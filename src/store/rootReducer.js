import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import submissions from "./submissions/reducer";
import contests from "./contests/reducer";

export default combineReducers({
  appState,
  user,
  submissions,
  contests,
});
