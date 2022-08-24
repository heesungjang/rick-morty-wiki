// REACT
import React from "react";

// COMPONENTS
import TabBarIcon from "./TabBarIcon";

const OuterSideBar = () => {
  return (
    <div className="fixed top-0 left-0 m-0 flex h-screen w-16 flex-col bg-gray-900 text-white shadow-lg">
      <TabBarIcon>Character</TabBarIcon>
      <TabBarIcon>Location</TabBarIcon>
      <TabBarIcon>Episode</TabBarIcon>
    </div>
  );
};

export default OuterSideBar;
