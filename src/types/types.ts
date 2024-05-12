export type Movie = {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  vote_average: number;
  overview: string | "";
  trailer: string;
  cast: Cast[];
  backdrop_path: string;
};

export type Cast = {
  id: number;
  name: string;
  profile_path: string;
  character: string;
};

export type initialMovieStateType = {
  topMovies: Movie[] | null;
  currentMovie: Movie | null;
  fetchedMovies: Movie[] | null;
  status: string;
  error: string;
};

export type Show = {
  id: number;
  name: string;
  first_air_date: number;
  vote_average: number;
  poster_path: string;
  overview: string | "";
};

export type initialShowType = {
  topShows: Show[] | null;
  currentShow: Show | null;
  fetchedShows: Show[] | null;
  status: string;
  error: string;
};

export type FethchTopShowsResponse = {
  resutls: Show[];
};

export type initialStateShowType = {
  search: string;
  tab: "show" | "movie";
};
