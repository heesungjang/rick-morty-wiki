import { url } from "inspector";
import React from "react";
import { useQuery } from "react-query";
import { fetchSingleCharacter } from "../../api/characterApi";
import { useStore } from "../../store";

const Content = () => {
  const id = useStore((state) => state.selectedCharacter);
  const { data } = useQuery(["getSingleCharacter", id], () => fetchSingleCharacter(id));

  console.log(data);
  if (!data) {
    return (
      <div className="absolute right-0 flex h-screen w-[calc(100vw-22rem)] items-center justify-center bg-gray-700">
        <span className="text-4xl text-blue-500">No Character Selected.</span>
      </div>
    );
  }
  return (
    <div className="absolute  right-0 flex h-screen w-[calc(100vw-22rem)] flex-col items-center bg-gray-700">
      <div className="mt-28 h-[34rem] w-[42rem]  rounded-3xl bg-gray-800 transition duration-300 ease-in-out hover:drop-shadow-xl">
        <div className="-mb-14  -translate-y-1/2 transform">
          <img
            className="mx-auto  h-32 rounded-full shadow-2xl  transition duration-300 ease-in-out hover:scale-105 hover:drop-shadow-2xl"
            src={data.data.image}
            alt=""
          />
        </div>
        <div className="text-center">
          <h3 className="text-3xl font-bold text-white">{data.data.name}</h3>
          <span className="text-sm text-white">status: {data.data.status}</span>
        </div>
        {/* <div>dsad</div> */}
      </div>
    </div>
  );
};

export default Content;
