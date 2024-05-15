import Banner from "../../../components/Banner";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

const mockMovieAllData = {
  id: 1,
  poster_path: "/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
  overview: "",
  trailer: "9czDjY0EtGM",
  cast: [],
  backdrop_path: "/qdIMHd4sEfJSckfVJfKQvisL02a.jpg",
  recommended: [],
  runtime: 142,
  genres: null,
  title: "Forrest Gump",
  release_date: "1994-06-23",
  vote_average: 7.9,
};

const mockMovieJustWithCover = {
  ...mockMovieAllData,
  trailer: "",
};

const mockMovieWithoutTrailerAndCover = {
  ...mockMovieAllData,
  trailer: "",
  backdrop_path: null,
};

const videoUrl = `https://www.youtube.com/embed/${mockMovieAllData.trailer}`;
const coverUrl = `https://image.tmdb.org/t/p/w500/${mockMovieAllData.backdrop_path}`;

test("renders YouTube player for movie with trailer", () => {
  const { container } = render(<Banner object={mockMovieAllData} />);
  const iframeElement = container.querySelector(`iframe[src='${videoUrl}']`);

  expect(iframeElement).toBeInTheDocument();
});

test("renders cover photo for movie with backdrop path and no trailer", () => {
  const { getByRole } = render(<Banner object={mockMovieJustWithCover} />);

  expect(getByRole("img")).toBeInTheDocument();
  expect(getByRole("img")).toHaveAttribute("src", coverUrl);
});

test("renders message for movie with no trailer or photo", () => {
  const { getByText } = render(
    <Banner object={mockMovieWithoutTrailerAndCover} />
  );
  expect(getByText("There is no trailer or poster!")).toBeInTheDocument();
});
