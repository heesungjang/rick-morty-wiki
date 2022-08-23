import React from "react";
import { useQuery } from "react-query";
import { Character, fetchAllCharacters } from "../api/characterApi";
import SideBar from "../components/SideBar/SideBar";

const Main = () => {
  const { data } = useQuery<Character[]>("all-characters", fetchAllCharacters);

  return (
    <div className="flex">
      <SideBar />
    </div>
  );
};

export default Main;
