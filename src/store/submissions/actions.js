import axios from "axios";
import { showMessageWithTimeout } from "../appState/actions";
import { selectUser } from "../user/selectors";

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

export const postSubmission = (contestId, soundcloudUrl, songDescription) => {
  return async (dispatch, getState) => {
    const { id, token } = selectUser(getState());
    const res = await axios.post(
      `${apiUrl}/submit/${id}`,
      {
        contestId,
        soundcloudUrl,
        songDescription,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(res.data);
    dispatch(
      showMessageWithTimeout(
        "success",
        false,
        "Posted successfull, good luck!",
        10000
      )
    );
  };
};
