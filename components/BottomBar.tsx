"use client";

import React from "react";
import Button from "./Button";
import { IoPersonAdd, IoPersonRemove, IoPeopleSharp } from "react-icons/io5";
import { LiaRandomSolid } from "react-icons/lia";
import { participantStore } from "@/store/participant-store";
import { useStore } from "zustand";
import { SideBarStore } from "@/store/layout-store";

const BottomBar = () => {
  const participants = useStore(participantStore).participants;
  const addParticipant = useStore(participantStore).addParticipant;
  const removeParticipant = useStore(participantStore).removeParticipant;
  const toggle = useStore(SideBarStore).toggle;

  const handleAddParticipant = () => {
    if (participants.length >= 49) return;
    addParticipant({ id: Math.random() });
  };

  const handleRemoveParticipant = () => {
    if (participants.length > 0) {
      removeParticipant(participants[participants.length - 1].id);
    }
  };

  const handleRandomize = () => {
    const random = Math.floor(Math.random() * 2);
    if (random === 0) {
      addParticipant({ id: Math.random() });
    } else {
      handleRemoveParticipant();
    }
  };

  return (
    <div className="text-white py-6 px-12 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Button
          onClick={handleAddParticipant}
          className="bg-blue-500 hover:bg-blue-700"
          icon={<IoPersonAdd className="size-4" />}
        />
        <Button
          onClick={handleRemoveParticipant}
          className="bg-red-500 hover:bg-red-700"
          icon={<IoPersonRemove className="size-4" />}
        />
        <Button
          onClick={handleRandomize}
          className="bg-yellow-500 hover:bg-yellow-700"
          icon={<LiaRandomSolid className="size-4" />}
        />
      </div>
      <div>
        <Button
          onClick={toggle}
          className="bg-green-500 hover:bg-green-700 px-4 py-2 rounded-full flex items-center space-x-2"
          icon={<IoPeopleSharp className="size-4" />}
          text={participants.length.toString()}
        />
      </div>
    </div>
  );
};

export default BottomBar;
