import React, { useEffect } from "react";
import ReactPlayer from "react-player/soundcloud";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { postVote, updateScore } from "../../store/submissions/actions";
import { selectUser } from "../../store/user/selectors";
import { useState } from "react";
import { fetchVotes } from "../../store/userVotes/actions";
import { selectUserVotes } from "../../store/userVotes/selectors";

function SoundCloudPlayer(props) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const votes = useSelector(selectUserVotes);
  const [score, setScore] = useState(props.trackScore);

  const votesPerSubmission = votes.filter(
    (vote) => vote.submissionId === props.submissionId
  );

  useEffect(() => {
    dispatch(fetchVotes(props.submissionId));
  }, [dispatch]);

  function submitForm(e) {
    e.preventDefault();
    dispatch(postVote(props.userId, props.submissionId, props.contestId));
  }
  function submitScore(e) {
    e.preventDefault();
    dispatch(updateScore(props.submissionId, score));
  }

  return (
    <div>
      <Card>
        <Card.Header>{props.nickname}</Card.Header>
        <Card.Body>
          <Card.Text>{props.songDescription}</Card.Text>
          <ReactPlayer url={props.soundcloudUrl} height="70%" />
          <p>Crowd votes: {votesPerSubmission.length}</p>
          {user.isAdmin ? (
            <Form>
              <input
                type="number"
                placeholder={props.trackScore}
                value={score}
                onChange={(e) => {
                  setScore(parseInt(e.target.value));
                }}
              ></input>
              <Button variant="primary" type="submit" onClick={submitScore}>
                Submit Score
              </Button>
            </Form>
          ) : null}
        </Card.Body>
        {user.token === null ? (
          <p>Please login to vote</p>
        ) : props.activeContest === true ? (
          <>
            <Button variant="primary" type="submit" onClick={submitForm}>
              Vote
            </Button>
          </>
        ) : null}
      </Card>
    </div>
  );
}

export default SoundCloudPlayer;
