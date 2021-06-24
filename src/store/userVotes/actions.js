import axios from "axios";

import { apiUrl } from "../../config/constants";

export const FETCH_VOTES = "FETCH_VOTES";

export const fetchVotesSuccess = (votes) => ({
  type: FETCH_VOTES,
  payload: votes,
});

export const fetchVotes = (submissionId) => {
  return async (dispatch, getState) => {
    const res = await axios.get(`${apiUrl}/submissions/votes`, {
      submissionId,
    });
    dispatch(fetchVotesSuccess(res.data.votes));
  };
};
