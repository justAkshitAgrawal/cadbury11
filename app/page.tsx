import BottomBar from "@/components/BottomBar";
import TopBar from "@/components/TopBar";
import VideoGrid from "@/components/VideoGrid";
import React from "react";

const Home = () => {
  return (
    <div className="bg-[#121214] h-screen flex flex-col ">
      <TopBar />
      <VideoGrid />
      <BottomBar />
    </div>
  );
};

export default Home;
