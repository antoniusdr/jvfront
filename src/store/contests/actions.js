import axios from "axios";
import { apiUrl } from "../../config/constants";
import { selectUser } from "../user/selectors";

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

export const postContest = (contestName, description, imgUrl, isActive) => {
  return async (dispatch, getState) => {
    const { token } = selectUser(getState());
    const res = await axios.post(
      `${apiUrl}/contests/create`,
      {
        contestName,
        description,
        imgUrl,
        isActive,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(res.data);
  };
};
