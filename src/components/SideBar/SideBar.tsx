import React from "react";
import SideBarIcon from "./SideBarIcon";

const SideBar = () => {
  return (
    <div className="fixed top-0 left-0 m-0 flex h-screen w-16 flex-col bg-gray-900 text-white">
      <SideBarIcon>Character</SideBarIcon>
      <SideBarIcon>Location</SideBarIcon>
      <SideBarIcon>Episode</SideBarIcon>
    </div>
  );
};

export default SideBar;
