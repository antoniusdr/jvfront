import React from "react";
import ReactPlayer from "react-player/soundcloud";
import Card from "react-bootstrap/Card";

function SoundCloudPlayer(props) {
  return (
    <div>
      <Card>
        <Card.Header>{props.nickname}</Card.Header>
        <Card.Body>
          {/* <Card.Title>Test</Card.Title> */}
          <Card.Text>{props.songDescription}</Card.Text>
          <ReactPlayer url={props.soundcloudUrl} height="70%" />
        </Card.Body>
      </Card>
    </div>
  );
}

export default SoundCloudPlayer;
