import React from "react";
import { useQuery } from "react-query";
import { useStore } from "../store";
import { Character, fetchAllCharacters } from "../api/characterApi";
import TabBar from "../components/sideBar/TabBar";
import SelectionBar from "../components/sideBar/SelectionBar";

const Main = () => {
  const currTab = useStore((state) => state.selectedTab);

  return (
    <div className="flex">
      <TabBar />
      <SelectionBar />
    </div>
  );
};

export default Main;
