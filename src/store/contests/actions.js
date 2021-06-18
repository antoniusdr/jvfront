import axios from "axios";
import { apiUrl } from "../../config/constants";

export const FETCH_CONTESTS_SUCCESS = "FETCH_CONTESTS_SUCCESS";

export const fetchContestsSuccess = (contests) => ({
  type: FETCH_CONTESTS_SUCCESS,
  payload: contests,
});

export const fetchContests = () => {
  return async (dispatch, getState) => {
    const res = await axios.get(`${apiUrl}/contests`);
    dispatch(fetchContestsSuccess(res.data.contests.rows));
  };
};
