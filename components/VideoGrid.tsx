"use client";

import { participantStore } from "@/store/participant-store";
import React, { useEffect, useRef, useState } from "react";
import { useStore } from "zustand";
import SideBar from "./SideBar";
import { SideBarStore } from "@/store/layout-store";
import { AnimatePresence, motion } from "framer-motion";
import ParticipantBox from "./ParticipantBox";

const VideoGrid = () => {
  const participants = useStore(participantStore).participants;
  const isOpen = useStore(SideBarStore).isOpen;
  const numColumns = Math.floor(Math.sqrt(participants.length));

  return (
    <div className="flex w-full h-full max-h-full px-12 ">
      <AnimatePresence>
        <div className="flex flex-1 flex-col items-center justify-center h-full max-h-full w-full ">
          {participants.length === 0 && (
            <p className="absolute left-[50%] translate-x-[-50%] text-center text-white">
              No participants
            </p>
          )}
          <motion.div
            className="scrollbar-hide"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${numColumns}, 1fr)`,
              gap: "8px",
              flex: 1,
              height: "calc(100vh - 180px)",
              overflow: "hidden",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
            layoutId="videoGrid"
          >
            {participants.map((participant, index) => (
              <motion.div
                layoutId={`participant-${participant.id}`}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                key={participant.id}
                style={{
                  borderRadius: "5px",
                }}
                className="h-full w-full relative flex items-center justify-center  "
              >
                <ParticipantBox participant={participant} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {isOpen && <SideBar key={"sidebar"} />}
      </AnimatePresence>
    </div>
  );
};

export default VideoGrid;
