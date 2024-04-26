"use client";

import React from "react";
import Video from "next-video";
import vid from "../videos/sample-5s.mp4";
import Button from "./Button";
import { IoVideocam } from "react-icons/io5";
import { participantStore } from "@/store/participant-store";
import { useStore } from "zustand";

interface ParticipantBoxProps {
  participant: {
    id: number;
    videoIsOn?: boolean;
  };
}
const ParticipantBox = (props: ParticipantBoxProps) => {
  const { videoIsOn, id } = props.participant;
  const turnVideoOn = useStore(participantStore).turnVideoOn;
  const turnVideoOff = useStore(participantStore).turnVideoOff;

  return (
    <div className=" text-white flex relative items-center p-2 justify-center rounded-md aspect-video max-h-full bg-[#181a20] h-full overflow-hidden ">
      {videoIsOn && (
        <div className="absolute bg-white w-full">
          <Video className="" src={vid} autoPlay loop muted controls={false} />
        </div>
      )}
      <p className="absolute bottom-0 left-2">{(1000 * id).toFixed(0)}</p>
      <Button
        onClick={() => {
          if (videoIsOn) {
            turnVideoOff(id);
          } else {
            turnVideoOn(id);
          }
        }}
        className={`bg-blue-500 hover:bg-blue-700 z-10 ${
          videoIsOn
            ? "opacity-50 bg-transparent hover:bg-black hover:opacity-100"
            : ""
        }`}
        icon={
          <IoVideocam
            className={`size-4 ${videoIsOn ? "text-red-500" : "text-white"}`}
          />
        }
      />
    </div>
  );
};

export default ParticipantBox;
