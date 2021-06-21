import React from "react";
import ReactPlayer from "react-player/soundcloud";
import Container from "react-bootstrap/Container";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/selectors";

function SoundCloudPlayer(props) {
  const user = useSelector(selectUser);

  // const userData = user?.find((idUser) => idUser === props.userId);
  // console.log(userData);
  console.log(props.userId);

  return (
    <div>
      <Container>
        <p>{props.songDescription}</p>
        <ReactPlayer url={props.soundcloudUrl} height="70%" />
      </Container>
    </div>
  );
}

export default SoundCloudPlayer;
