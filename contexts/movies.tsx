import * as tmdb from "../lib/tmdb";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from "react";
import constants from "expo-constants";

type RefreshMoviesList = () => Promise<void>;
type MoviesContextProps = [tmdb.Movie[] | undefined, RefreshMoviesList];

const { TMDB_IMAGES_URL } = constants.manifest.extra;

const MoviesContext = createContext<MoviesContextProps>([] as any);

export const useMovies = () => {
  return useContext(MoviesContext);
};

export const MoviesProvider: React.FC = ({ children }) => {
  const [movies, setMovies] = useState<tmdb.Movie[]>();

  const fetchMovies = useCallback(
    async () => await tmdb.getPopularMovies(),
    []
  );

  const refreshMovies: RefreshMoviesList = useCallback(async () => {
    try {
      const response = await fetchMovies();
      const movies = response.results
        .map((movie) => ({
          ...movie,
          poster_path: `${TMDB_IMAGES_URL}${movie.poster_path}`,
          backdrop_path: `${TMDB_IMAGES_URL}${movie.backdrop_path}`
        }))
        .slice(0, 5);

      setMovies(movies);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    refreshMovies();
  }, []);

  return (
    <MoviesContext.Provider value={[movies, refreshMovies]}>
      {children}
    </MoviesContext.Provider>
  );
};
