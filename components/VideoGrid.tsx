"use client";
import { participantStore } from "@/store/participant-store";
import React from "react";
import { useStore } from "zustand";
import SideBar from "./SideBar";
import { SideBarStore } from "@/store/layout-store";
import { AnimatePresence, motion } from "framer-motion";

const VideoGrid = () => {
  const participants = useStore(participantStore).participants;
  const isOpen = useStore(SideBarStore).isOpen;

  const numColumns = Math.ceil(Math.sqrt(participants.length));

  const participantSize = `calc(100% / ${numColumns})`;

  return (
    <div className="flex w-full h-full max-h-full px-12 ">
      <div className="flex flex-1 flex-col items-center justify-center h-full max-h-full ">
        <motion.div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${numColumns}, 1fr)`,
            gap: "4px",
            flex: 1,
            overflow: "auto",
            height: "calc(100vh - 180px)",
            // padding: "20px",
            width: "100%",
          }}
          layoutId="videoGrid" // Assign a unique layoutId
          animate={{
            scale: [1, 0.5, 1], // Animation sequence for resizing
            transition: {
              duration: 0.8, // Duration of the animation
            },
          }}
        >
          <AnimatePresence>
            {participants.map((participant) => (
              <motion.div
                layoutId={`participant-${participant.id}`}
                initial={{
                  opacity: 0,
                  scale: 0.6,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                key={participant.id}
                style={{
                  // width: participantSize,
                  // height: participantSize,
                  backgroundColor: "gray",
                  borderRadius: "5px",
                }}
                className="w-full h-full opacity-50"
              >
                {/* TODO: Add Video */}
                <p className="p-10 text-center"></p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      {isOpen && <SideBar />}
    </div>
  );
};

export default VideoGrid;
