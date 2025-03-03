import React from "react";
import AudioPlayer from "./db";

const AudioPage = () => {
  return (
    <div>
      <AudioPlayer audioUrl="/warble_500.wav" />
    </div>
  );
};

export default AudioPage;
