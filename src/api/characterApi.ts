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
