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
      <div className="mt-32 h-[34rem] w-[42rem]  rounded-3xl bg-gray-800 transition duration-300 ease-in-out hover:drop-shadow-xl">
        <div className="-mb-14  -translate-y-1/2 transform">
          <img
            className="mx-auto  h-32 rounded-full shadow-2xl  transition duration-300 ease-in-out hover:scale-105 hover:drop-shadow-2xl"
            src={data.data.image}
            alt=""
          />
        </div>
        <div className="text-center">
          <h3 className="text-3xl font-bold text-white">{data.data.name}</h3>
          <div className="mt-2 flex flex-col">
            <span className="text-m mb-1 text-white">Status: {data.data.status}</span>
            <span className="text-m text-white">Origin: {data.data.origin.name}</span>
          </div>
        </div>
        <div className="mt-6  grid w-full grid-cols-2 px-16">
          <div className="mt-1 grid gap-5 text-lg text-gray-400">
            <span>Gender: {data.data.gender}</span>
            <span>Species: {data.data.species}</span>
            <span>Currently At: {data.data.location.name}</span>
            <span>First Appeared: {data?.data.created.substring(0, 10)}</span>
          </div>
          <div className="ext-lg grid h-full w-full justify-center gap-1 text-lg text-gray-400">
            <span className="font-semibold text-blue-500">Episodes</span>
            <div className="flex h-40 w-[15em] flex-col overflow-scroll rounded-xl bg-gray-700 px-3 pt-2">
              {data.data.episode.map((item, idx) => (
                <span className="text-lg">
                  {idx + 1}. {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
