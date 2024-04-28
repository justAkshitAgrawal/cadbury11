import React from "react";
import { motion } from "framer-motion";
import { FaVideo } from "react-icons/fa";

interface ParticipantInfoProps {
  id: number;
  cameraOn?: boolean;
}
const ParticipantInfo = ({ id, cameraOn }: ParticipantInfoProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      key={id}
      layoutId={`participant-box-inactive-${id}`}
      className="flex items-center justify-between p-2 border border-gray-600 text-white cursor-pointer rounded-md"
    >
      <div className="flex items-center space-x-2">
        <p className="text-sm">{(1000 * id).toFixed(0)}</p>
      </div>
      <FaVideo
        className={`
        ${cameraOn ? "text-green-500" : "text-red-500"}`}
      />
    </motion.div>
  );
};

export default ParticipantInfo;
