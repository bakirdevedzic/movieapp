import Card from "../../../components/Card";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../../store";

const mockMovie = {
  id: 1,
  poster_path: "/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
  overview:
    "A man with a low IQ has accomplished great things in his life and been present during significant historic events—in each case, far exceeding what anyone imagined he could do. But despite all he has achieved, his one true love eludes him.",
  trailer: "9czDjY0EtGM",
  cast: [],
  backdrop_path: "/qdIMHd4sEfJSckfVJfKQvisL02a.jpg",
  recommended: [],
  runtime: 142,
  genres: null,
  title:
    "Dream 9 Toriko & One Piece & Dragon Ball Z Super Collaboration Special!!",
  release_date: "1994-06-23",
  vote_average: 8.475,
};

const imageUrl = `https://image.tmdb.org/t/p/w500${mockMovie.poster_path}`;

const mockMovieWithoutImage = {
  ...mockMovie,
  poster_path: "",
};

const longTitle = `${mockMovie.title.slice(0, 48)}...`;
const longOverview = `${mockMovie.overview.slice(0, 140)}...`;

const year = mockMovie.release_date.slice(0, 4);

const rating = mockMovie.vote_average.toFixed(1);

test("movie image is loaded", () => {
  const { getByRole } = render(
    <Provider store={store}>
      <MemoryRouter>
        <Card
          movie={mockMovie}
          typeOfCard="movie"
          state={{ search: "Forrest gump", tab: "movie" }}
        />
      </MemoryRouter>
    </Provider>
  );

  expect(getByRole("img")).toBeInTheDocument();
  expect(getByRole("img")).toHaveAttribute("src", imageUrl);
});

test("renders message when there is no poster", () => {
  const { getByText } = render(
    <Provider store={store}>
      <MemoryRouter>
        <Card
          movie={mockMovieWithoutImage}
          typeOfCard="movie"
          state={{ search: "Forrest gump", tab: "movie" }}
        />
      </MemoryRouter>
    </Provider>
  );

  expect(getByText("No poster available!")).toBeInTheDocument();
});

test("renders title with truncation", () => {
  const { getByText } = render(
    <Provider store={store}>
      <MemoryRouter>
        <Card
          movie={mockMovie}
          typeOfCard="movie"
          state={{ search: "Forrest gump", tab: "movie" }}
        />
      </MemoryRouter>
    </Provider>
  );

  expect(getByText(longTitle)).toBeInTheDocument();
});

test("renders overview with truncation", () => {
  const { getByText } = render(
    <Provider store={store}>
      <MemoryRouter>
        <Card
          movie={mockMovie}
          typeOfCard="movie"
          state={{ search: "Forrest gump", tab: "movie" }}
        />
      </MemoryRouter>
    </Provider>
  );

  expect(getByText(longOverview)).toBeInTheDocument();
});

test("testing data manipulation", () => {
  const { getByText } = render(
    <Provider store={store}>
      <MemoryRouter>
        <Card
          movie={mockMovie}
          typeOfCard="movie"
          state={{ search: "Forrest gump", tab: "movie" }}
        />
      </MemoryRouter>
    </Provider>
  );

  expect(getByText(year)).toBeInTheDocument();
});

test("testing rounding of rating", () => {
  const { getByText } = render(
    <Provider store={store}>
      <MemoryRouter>
        <Card
          movie={mockMovie}
          typeOfCard="movie"
          state={{ search: "Forrest gump", tab: "movie" }}
        />
      </MemoryRouter>
    </Provider>
  );

  expect(getByText(rating)).toBeInTheDocument();
});
