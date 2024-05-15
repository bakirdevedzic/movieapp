import PlotCard from "../../../components/PlotCard";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

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
  title: "Forrest Gump",
  release_date: "1994-06-23",
  vote_average: 8.475,
};

const imageUrl = `https://image.tmdb.org/t/p/w500/${mockMovie.poster_path}`;

const year = mockMovie.release_date.slice(0, 4);

const mockMovieWithoutSomeData = {
  ...mockMovie,
  poster_path: "",
  overview: "",
  genres: null,
  runtime: 0,
  release_date: "",
};

test("movie image is loaded", () => {
  const { getByRole } = render(<PlotCard object={mockMovie} />);

  expect(getByRole("img")).toBeInTheDocument();
  expect(getByRole("img")).toHaveAttribute("src", imageUrl);
});

test("renders message when there is no poster", () => {
  const { getByText } = render(<PlotCard object={mockMovieWithoutSomeData} />);

  expect(getByText("No poster available!")).toBeInTheDocument();
});

test("renders message when there is no data", () => {
  const { getAllByText } = render(
    <PlotCard object={mockMovieWithoutSomeData} />
  );

  const noDataMessages = getAllByText(/No data/i);

  expect(noDataMessages.length).toBe(4);
});

test("testing data manipulation", () => {
  const { getByText } = render(<PlotCard object={mockMovie} />);

  const regExp = new RegExp(year, "i");

  expect(getByText(regExp)).toBeInTheDocument();
});
