import axios from "axios";
import api from "./api";

export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export type allCharactersResponse = {
  info: {
    count: number;
    next: string | null;
    pages: number;
    prev: string | null;
  };
  results: Character[];
};

export const fetchAllCharacters = (
  page: number,
  status: { alive: boolean; dead: boolean; unknown: boolean },
  searchTerm: string
) => {
  const { alive, dead, unknown } = status;
  return api
    .get<allCharactersResponse>(`character`, {
      params: {
        page,
        status: alive ? "alive" : dead ? "dead" : unknown ? "unknown" : null,
        name: searchTerm && searchTerm,
      },
    })
    .then((res) => res.data);
};

export const fetchSingleCharacter = async (id: number) => {
  if (id) {
    const res = await api.get<Character>(`character/${id}`);

    let episodes = [];
    for (let epi of res.data.episode) {
      episodes.push(axios.get(epi));
    }

    const epiResponses = await Promise.all(episodes);
    episodes = [];

    for (let res of epiResponses) {
      episodes.push(res.data.name);
    }

    return {
      ...res,
      data: {
        ...res.data,
        episode: episodes,
      },
    };
  } else {
    return null;
  }
};
