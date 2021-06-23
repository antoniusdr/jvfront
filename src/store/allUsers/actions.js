import { apiUrl, DEFAULT_PAGINATION_LIMIT } from "../../config/constants";
import axios from "axios";

export const FETCH_ALL_USERS = "FETCH_ALL_USERS";

export const fetchAllUsersSuccess = (allUsers) => ({
  type: FETCH_ALL_USERS,
  payload: allUsers,
});

export const fetchAllUsers = () => {
  return async (dispatch, getState) => {
    const userCount = getState().allUsers.length;
    const res = await axios.get(
      `${apiUrl}/all?limit=${DEFAULT_PAGINATION_LIMIT}&offset=${userCount}`
    );
    dispatch(fetchAllUsersSuccess(res.data.allUsers.rows));
  };
};
