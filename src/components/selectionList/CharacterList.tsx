import React, { useCallback, useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { allCharactersResponse, fetchAllCharacters } from "../../api/characterApi";

import { Rings } from "react-loader-spinner";
import { useStore } from "../../store";

export type ICharacterStatus = {
  searchTerm: string;
  status: {
    alive: boolean;
    dead: boolean;
    unknown: boolean;
  };
};

const CharacterList = ({ status, searchTerm }: ICharacterStatus) => {
  const selectChar = useStore((state) => state.selectCharacter);
  const selectedChar = useStore((state) => state.selectedCharacter);
  // refs
  const boxRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver>();

  // R-Q
  const { data, isLoading, fetchNextPage, hasNextPage, isError } =
    useInfiniteQuery<allCharactersResponse>(
      ["all-characters", status, searchTerm],
      ({ pageParam = 1 }) => fetchAllCharacters(pageParam, status, searchTerm),
      {
        getNextPageParam: (lastPage, allPages) => {
          if (lastPage.info.next) {
            return lastPage.info.next.slice(-1);
          } else {
            return null;
          }
        },

        retry: false,
      }
    );

  const intersectionObserver = useCallback(
    (entries: IntersectionObserverEntry[], io: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 관찰하고 있는 entry가 화면에 보여지는 경우
          io.unobserve(entry.target); // entry 관찰 해제
          if (hasNextPage) {
            fetchNextPage(); // 다음 페이지 데이터 요청
          }
        }
      });
    },
    [fetchNextPage, hasNextPage]
  );

  useEffect(() => {
    if (observerRef.current) {
      // 기존에 IntersectionObserver이 있을 경우
      observerRef.current.disconnect(); // 연결 해제
    }

    observerRef.current = new IntersectionObserver(intersectionObserver); // IntersectionObserver 새롭게 정의
    boxRef.current && observerRef.current.observe(boxRef.current); // boxRef 관찰 시작
  }, [data, intersectionObserver]);

  return (
    <div className="absolute bottom-0 m-0 ml-16 h-[calc(100vh-10rem)]  w-72  overflow-scroll bg-gray-800 px-3 scrollbar-hide">
      {data?.pages.map((page, pageIndex) =>
        page.results.map((item, itemIndex) => {
          return (
            <div
              onClick={() => selectChar(item.id)}
              className=" group mb-2 flex cursor-pointer items-center py-2  shadow-lg transition-all duration-150 ease-linear  hover:scale-105"
              key={item.id}
              ref={
                page.results.length * pageIndex + itemIndex ===
                data.pages.length * page.results.length - 1
                  ? boxRef
                  : null
              }
            >
              <img className="mr-3 h-10 w-10 rounded-full" src={item.image} alt="" />
              <div className="flex flex-col">
                {selectedChar === item.id ? (
                  <span className="cursor-default;  text-lg font-semibold text-blue-500 text-opacity-90 transition-all duration-150 ">
                    {item.name}
                  </span>
                ) : (
                  <span className="cursor-default;  text-lg font-semibold text-gray-500 text-opacity-90 transition-all duration-150 group-hover:text-blue-500">
                    {item.name}
                  </span>
                )}

                <span className="cursor-default;  text-sm  font-semibold text-gray-500 text-opacity-90">
                  status: {item.status}
                </span>
              </div>
            </div>
          );
        })
      )}
      {isError && (
        <div className="inline-flex h-[20%]  w-full items-center justify-center">
          <span className="text-3xl font-semibold text-blue-500">Not Found.</span>
        </div>
      )}
      <div className="flex items-center justify-center">{isLoading && <Rings />}</div>
    </div>
  );
};

export default CharacterList;
