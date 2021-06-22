import axios from "axios";
import { showMessageWithTimeout } from "../appState/actions";
import { selectUser } from "../user/selectors";

import { apiUrl, DEFAULT_PAGINATION_LIMIT } from "../../config/constants";

export const FETCH_SUBMISSIONS_SUCCESS = "FETCH_SUBMISSIONS_SUCCESS";

export const POST_SUBMISSION_SUCCESS = "POST_SUBMISSION_SUCCESS";

export const fetchSubmissionsSuccess = (submissions) => ({
  type: FETCH_SUBMISSIONS_SUCCESS,
  payload: submissions,
});
export const submissionPostSuccess = (submission) => ({
  type: POST_SUBMISSION_SUCCESS,
  payload: submission,
});

export const fetchSubmissions = () => {
  return async (dispatch, getState) => {
    const submissionCount = getState().submissions.length;
    const res = await axios.get(
      `${apiUrl}/submissions?limit=${DEFAULT_PAGINATION_LIMIT}&offset=${submissionCount}`
    );

    dispatch(fetchSubmissionsSuccess(res.data.submissions.rows));
  };
};

export const postSubmission = (
  contestId,
  soundcloudUrl,
  songDescription,
  nickname
) => {
  return async (dispatch, getState) => {
    const { id, token } = selectUser(getState());
    const res = await axios.post(
      `${apiUrl}/submissions/${id}`,
      {
        contestId,
        soundcloudUrl,
        songDescription,
        nickname,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(res.data);
    dispatch(
      showMessageWithTimeout(
        "success",
        false,
        "Posted successfuly, best of luck!",
        10000
      )
    );
  };
};
