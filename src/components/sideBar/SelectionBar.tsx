import React from "react";
import { useQuery } from "react-query";
import { Character, fetchAllCharacters } from "../../api/characterApi";
import { useStore } from "../../store";
import CharacterList from "../selectionList/CharacterList";

const SelectionBar = () => {
  const currTab = useStore((state) => state.selectedTab);

  return (
    <div
      className=" m-0 ml-16 h-screen w-72 overflow-scroll bg-gray-200
  pl-3 scrollbar-hide dark:bg-gray-800"
    >
      <span className="  mb-4 mt-4 block text-2xl text-white">{currTab}</span>
      {currTab === "Character" && <CharacterList />}
    </div>
  );
};

export default SelectionBar;
