import { Movie, Show } from "../types/types";

export function getSavedMovies() {
  const savedMovies = JSON.parse(localStorage.getItem("savedMovies") || "[]");
  return savedMovies;
}

export function setSavedMovies(movies: Movie[]) {
  localStorage.setItem("savedMovies", JSON.stringify(movies));
}

export function getSavedShows() {
  const savedShows = JSON.parse(localStorage.getItem("savedShows") || "[]");
  return savedShows;
}

export function setSavedShows(shows: Show[]) {
  localStorage.setItem("savedShows", JSON.stringify(shows));
}

export function saveMovie(movie: Movie) {
  const savedMovies = getSavedMovies();
  savedMovies.push(movie);
  setSavedMovies(savedMovies);
}

export function deleteMovie(movieId: number) {
  const savedMovies = getSavedMovies();
  const movieIndex = savedMovies.findIndex(
    (movie: Movie) => movie.id === movieId
  );
  if (movieIndex !== -1) {
    savedMovies.splice(movieIndex, 1);
  }
  setSavedMovies(savedMovies);
}

export function saveShow(show: Show) {
  const savedShows = getSavedShows();
  savedShows.push(show);
  setSavedShows(savedShows);
}

export function deleteShow(showId: number) {
  const savedShows = getSavedShows();
  const showIndex = savedShows.findIndex((show: Show) => show.id === showId);
  if (showIndex !== -1) {
    savedShows.splice(showIndex, 1);
  }
  setSavedShows(savedShows);
}

export function isMovieInStorage(movieId: number) {
  const savedMovies = getSavedMovies();
  const movieIndex = savedMovies.findIndex(
    (movie: Movie) => movie.id === movieId
  );

  if (movieIndex === -1) return false;
  return true;
}

export function isShowInStorage(showId: number) {
  const savedShows = getSavedShows();
  const showIndex = savedShows.findIndex((show: Show) => show.id === showId);
  if (showIndex === -1) return false;
  return true;
}

export {};
