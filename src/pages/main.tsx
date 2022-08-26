// REACT
import React from "react";

// COMPONENTS
import TabBar from "../components/sideBar/TabBar";
import Content from "../components/content/Content";
import SelectionBar from "../components/sideBar/SelectionBar";

const Main = () => {
  return (
    <div className="flex">
      <TabBar />
      <SelectionBar />
      <Content />
    </div>
  );
};

export default Main;
