"use client";

import React from "react";
import { motion } from "framer-motion";
import { participantStore } from "@/store/participant-store";
import { useStore } from "zustand";
import { FaVideo } from "react-icons/fa";

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
      style={{ height: "calc(100vh - 165px)" }}
      className="ml-5 flex h-full max-h-full w-80 "
    >
      <div className="bg-white h-full p-4 rounded-md w-full overflow-scroll scrollbar-hide">
        <div className="flex items-center justify-between py-4">
          <h1 className="text-xl font-semibold">Participants</h1>
          <p className="text-sm text-gray-500">{participants.length} online</p>
        </div>
        <div className="flex flex-col space-y-4">
          {participants
            .filter((participant) => participant.videoIsOn)
            .map((participant) => (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key={participant.id}
                layoutId={`participant-box-active-${participant.id}`}
                className="flex items-center justify-between p-2 bg-gray-100 rounded-md"
              >
                <div className="flex items-center space-x-2">
                  <p className="text-sm">
                    {(1000 * participant.id).toFixed(0)}
                  </p>
                </div>

                <FaVideo className="text-green-500" />
              </motion.div>
            ))}

          {participants
            .filter((participant) => !participant.videoIsOn)
            .map((participant) => (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key={participant.id}
                layoutId={`participant-box-inactive-${participant.id}`}
                className="flex items-center justify-between p-2 bg-gray-100 rounded-md"
              >
                <div className="flex items-center space-x-2">
                  <p className="text-sm">
                    {(1000 * participant.id).toFixed(0)}
                  </p>
                </div>
                <FaVideo className="text-red-500" />
              </motion.div>
            ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SideBar;
