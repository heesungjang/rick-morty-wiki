import axios from "axios";
import React from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { allCharactersResponse, Character, fetchAllCharacters } from "../../api/characterApi";

const CharacterList = () => {
  const { data, isLoading, isError, fetchNextPage } = useInfiniteQuery<allCharactersResponse>(
    "all-characters",
    ({ pageParam = 1 }) => fetchAllCharacters(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.info.next) {
          return lastPage.info.next.slice(-1);
        } else {
          return undefined;
        }
      },
    }
  );

  if (isLoading) {
    return <div>loading..</div>;
  }

  return (
    <div>
      {data?.pages.map((page) =>
        page.results.map((item) => {
          return (
            <div
              className="group mb-2 flex cursor-pointer items-center py-1 shadow-lg  transition-all duration-150 ease-linear hover:scale-105"
              key={item.id}
            >
              <img className="mr-3 h-10 w-10 rounded-full" src={item.image} alt="" />
              <div className="flex flex-col">
                <span className="cursor-default;  text-lg font-semibold text-gray-500 text-opacity-90 transition-all duration-150 group-hover:text-blue-500">
                  {item.name}
                </span>
                <span className="cursor-default;  text-sm  font-semibold text-gray-500 text-opacity-90">
                  status: {item.status}
                </span>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default CharacterList;
