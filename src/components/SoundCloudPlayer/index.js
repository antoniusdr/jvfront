import React from "react";
import ReactPlayer from "react-player/soundcloud";

function SoundCloudPlayer(props) {
  return (
    <div>
      <ReactPlayer url={props.soundcloudUrl} height="70%" />
    </div>
  );
}

export default SoundCloudPlayer;
