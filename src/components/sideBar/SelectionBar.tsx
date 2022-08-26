import React, { useReducer, useState } from "react";
import { useQuery } from "react-query";
import { Character, fetchAllCharacters } from "../../api/characterApi";
import { useStore } from "../../store";
import CharacterList from "../selectionList/CharacterList";

const characterCheckBoxState = {
  alive: false,
  dead: false,
  unknown: false,
};

type characterCheckState = typeof characterCheckBoxState;

const characterCheckBoxReducer = (state: characterCheckState, action: { type: string }) => {
  switch (action.type) {
    case "alive": {
      return {
        dead: false,
        unknown: false,
        alive: !state.alive,
      };
    }
    case "dead": {
      return {
        alive: false,
        unknown: false,
        dead: !state.dead,
      };
    }

    case "unknown": {
      return {
        unknown: !state.unknown,
        dead: false,
        alive: false,
      };
    }

    default: {
      return state;
    }
  }
};

const SelectionBar = () => {
  const currTab = useStore((state) => state.selectedTab);

  const [charCheckState, dispatchCharCheck] = useReducer(
    characterCheckBoxReducer,
    characterCheckBoxState
  );

  return (
    <div className="h-screen bg-gray-800">
      <div className="fixed top-0 ml-16 flex h-24  w-72 flex-col  items-start   bg-gray-800 pl-3">
        <span className="mt-4 mb-2 text-3xl text-white">{currTab}</span>
        {/* ------ 필터 ------ */}
        {currTab === "Character" && (
          <div className="flex w-[100%] justify-between pr-5 text-white">
            <div className="flex items-center">
              <input
                className="checkbox mr-2"
                type="checkbox"
                name="alive"
                checked={charCheckState.alive}
                onChange={(e) => dispatchCharCheck({ type: e.target.name })}
              />
              <label htmlFor="alive">alive</label>
            </div>
            <div className="flex items-center">
              <input
                className="checkbox mr-2"
                type="checkbox"
                name="dead"
                checked={charCheckState.dead}
                onChange={(e) => dispatchCharCheck({ type: e.target.name })}
              />
              <label htmlFor="alive">dead</label>
            </div>
            <div className="flex items-center">
              <input
                className="checkbox mr-2"
                type="checkbox"
                name="unknown"
                checked={charCheckState.unknown}
                onChange={(e) => dispatchCharCheck({ type: e.target.name })}
              />
              <label htmlFor="unknown">unknown</label>
            </div>
          </div>
        )}
      </div>

      {currTab === "Character" && <CharacterList status={charCheckState} />}
    </div>
  );
};

export default SelectionBar;
