"use client";

import React from "react";
import { motion } from "framer-motion";
import { participantStore } from "@/store/participant-store";
import { useStore } from "zustand";
import { FaVideo } from "react-icons/fa";
import ParticipantInfo from "./ParticipantInfo";

const SideBar = () => {
  const participants = useStore(participantStore).participants;
  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 40,
        duration: 0.5,
        delay: 0.2,
      }}
      style={{ height: "calc(100vh - 172px)" }}
      className="ml-5 flex h-full max-h-full w-80 "
    >
      <div className="bg-[#181a20] h-full p-4 rounded-md w-full overflow-scroll scrollbar-hide">
        <div className="flex items-center justify-between py-4">
          <h1 className="text-xl text-white font-semibold">Participants</h1>
          <p className="text-sm text-gray-500">{participants.length} online</p>
        </div>
        <div className="flex flex-col space-y-4">
          {participants
            .filter((participant) => participant.videoIsOn)
            .map((participant) => (
              <ParticipantInfo
                key={participant.id}
                id={participant.id}
                cameraOn={participant.videoIsOn}
              />
            ))}

          {participants
            .filter((participant) => !participant.videoIsOn)
            .map((participant) => (
              <ParticipantInfo
                key={participant.id}
                id={participant.id}
                cameraOn={participant.videoIsOn}
              />
            ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SideBar;
