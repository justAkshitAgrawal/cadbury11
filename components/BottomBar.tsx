"use client";

import React, { useEffect, useState } from "react";
import Button from "./Button";
import { IoPersonAdd, IoPersonRemove, IoPeopleSharp } from "react-icons/io5";
import { LiaRandomSolid } from "react-icons/lia";
import { participantStore } from "@/store/participant-store";
import { useStore } from "zustand";
import { SideBarStore } from "@/store/layout-store";
import { FaCheckCircle, FaVideo, FaVideoSlash } from "react-icons/fa";
import { toast } from "sonner";

const BottomBar = () => {
  const participants = useStore(participantStore).participants;
  const addParticipant = useStore(participantStore).addParticipant;
  const removeParticipant = useStore(participantStore).removeParticipant;
  const randomizeParticipants =
    useStore(participantStore).randomizeParticipants;
  const toggle = useStore(SideBarStore).toggle;
  const aspectRatio = useStore(SideBarStore).aspectRatio;
  const isOpen = useStore(SideBarStore).isOpen;
  const setAspectRatio16by9 = useStore(SideBarStore).setAspectRatio16by9;
  const setAspectRatio4by3 = useStore(SideBarStore).setAspectRatio4by3;
  const turnAllVideoOn = useStore(participantStore).turnAllVideoOn;
  const turnAllVideoOff = useStore(participantStore).turnAllVideoOff;
  const isAllVideoOn = useStore(participantStore).isAllVideoOn;

  const [randomize, setRandomize] = useState(false);

  const handleAddParticipant = () => {
    if (participants.length >= 49) return;
    addParticipant({ id: Math.random() });
  };

  const handleRemoveParticipant = () => {
    if (participants.length > 0) {
      removeParticipant(participants[participants.length - 1].id);
    }
  };

  let intervalId: NodeJS.Timeout;

  useEffect(() => {
    if (!randomize) {
      clearInterval(intervalId);
      return;
    }

    intervalId = setInterval(randomizeParticipants, 500);

    return () => {
      clearInterval(intervalId);
    };
  }, [randomize]);

  return (
    <div className="text-white py-6 px-12 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Button
          onClick={() => {
            handleAddParticipant();
            if (participants.length < 49)
              toast.success(`Someone joined the call`);
          }}
          className="border border-gray-700 hover:text-green-500 transition-all hover:transform hover:-translate-y-[2px] hover:shadow-slate-700  hover:shadow-lg"
          icon={<IoPersonAdd className="size-4" />}
        />
        <Button
          onClick={() => {
            handleRemoveParticipant();
            if (participants.length > 0) toast.error(`Someone left the call`);
          }}
          className="border border-gray-700 hover:text-red-500 transition-all hover:transform hover:-translate-y-[2px] hover:shadow-slate-700  hover:shadow-lg"
          icon={<IoPersonRemove className="size-4" />}
        />
        <Button
          onClick={() => {
            if (participants.length === 0) {
              toast.error(`No participants to turn on video`);
              return;
            }
            isAllVideoOn ? turnAllVideoOff() : turnAllVideoOn();
          }}
          className={`border border-gray-700 hover:text-green-500 transition-all hover:transform hover:-translate-y-[2px] hover:shadow-slate-700  hover:shadow-lg ${
            isAllVideoOn ? "border-green-500" : "border-red-500"
          }`}
          icon={
            isAllVideoOn ? (
              <FaVideo className="size-4 text-green-500" />
            ) : (
              <FaVideoSlash className="size-4 text-red-500" />
            )
          }
        />
        <Button
          onClick={() => {
            setRandomize(!randomize);
          }}
          className={`border border-gray-700 hover:text-blue-500 transition-all hover:transform hover:-translate-y-[2px] hover:shadow-slate-700  hover:shadow-lg ${
            randomize ? "border-blue-500" : ""
          }`}
          icon={
            <LiaRandomSolid
              className={`size-4 ${randomize ? "text-blue-500" : ""}`}
            />
          }
        />
        <div className="relative hover:transform hover:-translate-y-[2px] hover:shadow-slate-700  hover:shadow-lg">
          {aspectRatio === "4 / 3" && (
            <FaCheckCircle className="absolute -right-2 -top-1 text-green-500" />
          )}
          <Button
            onClick={setAspectRatio4by3}
            className="border border-gray-700 hover:text-green-500 transition-all "
            text="4:3"
          />
        </div>
        <div className="relative hover:transform hover:-translate-y-[2px] hover:shadow-slate-700  hover:shadow-lg">
          {aspectRatio === "16 / 9" && (
            <FaCheckCircle className="absolute -right-2 -top-1 text-green-500" />
          )}
          <Button
            onClick={setAspectRatio16by9}
            className="border border-gray-700 hover:text-green-500 transition-all "
            text="16:9"
          />
        </div>
      </div>
      <div>
        <Button
          onClick={toggle}
          className={` px-4 py-2 border border-green-500 rounded-full flex items-center space-x-2 ${
            isOpen ? "bg-green-500" : "bg-transparent"
          }`}
          icon={<IoPeopleSharp className="size-4" />}
          text={participants.length.toString()}
        />
      </div>
    </div>
  );
};

export default BottomBar;
