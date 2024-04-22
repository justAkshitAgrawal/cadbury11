"use client";
import { participantStore } from "@/store/participant-store";
import React from "react";
import { useStore } from "zustand";
import SideBar from "./SideBar";
import { SideBarStore } from "@/store/layout-store";

const VideoGrid = () => {
  const participants = useStore(participantStore).participants;
  const isOpen = useStore(SideBarStore).isOpen;

  const numColumns = Math.ceil(Math.sqrt(participants.length));

  const participantSize = `calc(100% / ${numColumns})`;

  return (
    <div className="flex w-full h-full max-h-full px-12 ">
      <div className="flex flex-1 flex-col items-center justify-center h-full max-h-full ">
        <div
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
        >
          {participants.map((participant) => (
            <div
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
            </div>
          ))}
        </div>
      </div>
      {isOpen && <SideBar />}
    </div>
  );
};

export default VideoGrid;
