import React from "react";
import ReactPlayer from "react-player/soundcloud";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { postVote } from "../../store/submissions/actions";
import { selectUser } from "../../store/user/selectors";

function SoundCloudPlayer(props) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  function submitForm(e) {
    e.preventDefault();
    dispatch(postVote(props.userId, props.submissionId, props.contestId));
  }

  return (
    <div>
      <Card>
        <Card.Header>{props.nickname}</Card.Header>
        <Card.Body>
          <Card.Text>{props.songDescription}</Card.Text>
          <ReactPlayer url={props.soundcloudUrl} height="70%" />
        </Card.Body>
        {user.token === null ? (
          <p>Please login to vote</p>
        ) : props.activeContest === true ? (
          <Button variant="primary" type="submit" onClick={submitForm}>
            Vote
          </Button>
        ) : null}
      </Card>
    </div>
  );
}

export default SoundCloudPlayer;
