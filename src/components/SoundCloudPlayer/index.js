import React from "react";
import ReactPlayer from "react-player/soundcloud";

function SoundCloudPlayer(props) {
  console.log(props.soundcloudUrl);
  return (
    <div>
      <ReactPlayer url={props.soundcloudUrl} height="70%" />
    </div>
  );
}

export default SoundCloudPlayer;
