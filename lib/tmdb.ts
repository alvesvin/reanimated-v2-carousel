import merge from "deepmerge";
import constants from "expo-constants";

export interface Movie {
  id: number;
  poster_path: string; // eslint-disable-line camelcase
  adult: boolean;
  overview: string;
  release_date: string; // eslint-disable-line camelcase
  genre_ids: number[]; // eslint-disable-line camelcase
  original_title: string; // eslint-disable-line camelcase
  original_language: string; // eslint-disable-line camelcase
  title: string;
  backdrop_path: string; // eslint-disable-line camelcase
  populatrity: number;
  vote_count: number; // eslint-disable-line camelcase
  video: boolean;
  vote_average: number; // eslint-disable-line camelcase
}

interface PopularMoviesResponse {
  page: number;
  results: Movie[];
  total_results: number; // eslint-disable-line camelcase
  total_pages: number; // eslint-disable-line camelcase
}

// eslint-disable-next-line no-undef
interface CustomRequestInit extends RequestInit {
  params?: Record<string, string>;
}

const { TMDB_AUTH_TOKEN, TMDB_API_URL } = constants.manifest.extra;

// eslint-disable-next-line no-undef
const CONFIG: RequestInit = {
  method: "get",
  headers: {
    accept: "application/json; charset=utf-8",
    authorization: `Bearer ${TMDB_AUTH_TOKEN}`,
    "content-type": "application/json; charset=utf-8"
  }
};

function encodeParams(params: Record<string, string>) {
  let str = "?";

  Object.entries(params).forEach(([key, value]) => {
    str += `${key}=${value}&`;
  });

  return str.replace(/&$/, "");
}

async function request<T = any>(path: string, config?: CustomRequestInit) {
  const params = config?.params ? encodeParams(config.params) : "";
  const url = `${TMDB_API_URL}${path}${params}`;

  delete config?.params;

  const response = await fetch(url, merge(CONFIG, config || {}));
  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Server returned status code ${response.status}`);
  }

  return data as T;
}

export function getPopularMovies(): Promise<PopularMoviesResponse> {
  return request<PopularMoviesResponse>("/movie/popular", {
    params: { language: "pt-BR", sort_by: "popular.desc" }
  });
}
