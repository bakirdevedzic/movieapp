export type Movie = {
  id: number;
  title: string;
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
  title: string;
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
