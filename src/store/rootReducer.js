import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import submissions from "./submissions/reducer";
import contests from "./contests/reducer";
import allUsers from "./allUsers/reducer";
import userVotes from "./userVotes/reducer";

export default combineReducers({
  appState,
  user,
  submissions,
  contests,
  allUsers,
  userVotes,
});
