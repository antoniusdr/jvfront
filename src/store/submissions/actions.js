import axios from "axios";
import { apiUrl, DEFAULT_PAGINATION_LIMIT } from "../../config/constants";

export const FETCH_SUBMISSIONS_SUCCESS = "FETCH_SUBMISSIONS_SUCCESS";

export const fetchSubmissionsSuccess = (submissions) => ({
  type: FETCH_SUBMISSIONS_SUCCESS,
  payload: submissions,
});

export const fetchSubmissions = () => {
  return async (dispatch, getState) => {
    const submissionCount = getState().submissions.length;
    const res = await axios.get(
      `${apiUrl}/submissions?limit=${DEFAULT_PAGINATION_LIMIT}&offset=${submissionCount}`
    );
    console.log(res.data.submissions);
    dispatch(fetchSubmissionsSuccess(res.data.submissions.rows));
  };
};
