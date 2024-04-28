"use client";

import React from "react";
import Video from "next-video";
import vid from "../videos/sample-5s.mp4";
import Button from "./Button";
import { IoVideocam } from "react-icons/io5";
import { participantStore } from "@/store/participant-store";
import { useStore } from "zustand";
import { SideBarStore } from "@/store/layout-store";
import { motion } from "framer-motion";
import { MdOutlineCancel } from "react-icons/md";

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
  const removeParticipant = useStore(participantStore).removeParticipant;

  const aspectRation = useStore(SideBarStore).aspectRatio;

  return (
    <motion.div
      layoutId={`participant-box-${id}`}
      className=" text-white flex relative items-center p-2 justify-center rounded-md max-h-full bg-[#181a20] h-full overflow-hidden group "
      style={{ aspectRatio: aspectRation }}
    >
      <div
        onClick={() => {
          removeParticipant(id);
        }}
        className="absolute hidden z-20 text-red-500 cursor-pointer size-4 top-1 right-1 group-hover:block transition-all"
      >
        <MdOutlineCancel />
      </div>
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
        className={`border-blue-700 transition-all border hover:bg-blue-700 z-10 ${
          videoIsOn
            ? "opacity-50 bg-transparent border-black hover:bg-black hover:opacity-100"
            : ""
        }`}
        icon={
          <IoVideocam
            className={`size-3 ${videoIsOn ? "text-red-500" : "text-white"}`}
          />
        }
      />
    </motion.div>
  );
};

export default ParticipantBox;
