import { url } from "inspector";
import React from "react";
import { useQuery } from "react-query";
import { fetchSingleCharacter } from "../../api/characterApi";
import { useStore } from "../../store";

const Content = () => {
  const id = useStore((state) => state.selectedCharacter);
  const { data } = useQuery(["getSingleCharacter", id], () => fetchSingleCharacter(id));

  console.log(id, data);
  if (!data) {
    return (
      <div className="absolute right-0 flex h-screen w-[calc(100vw-22rem)] items-center justify-center bg-gray-700">
        <span className="text-4xl text-blue-500">No Character Selected.</span>
      </div>
    );
  }
  return <div className="absolute  right-0 h-screen w-[calc(100vw-22rem)] bg-gray-700"></div>;
};

export default Content;
