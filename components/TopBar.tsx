import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
const TopBar = () => {
  return (
    <div className="text-white py-6 px-12 flex items-center justify-between">
      <h1 className="cursor-pointer">
        Cadbury<span className="text-blue-500 font-semibold text-xl">11</span>
      </h1>

      <div className="flex items-center space-x-3">
        <h3 className="font-semibold">Welcome!</h3>
        <FaRegUserCircle className="text-2xl cursor-pointer" />
      </div>
    </div>
  );
};

export default TopBar;
