import ActorCard from "../../../components/ActorCard";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

const mockActor = {
  id: 1,
  name: "This is a very, very long name",
  character: "This is a very, very long character",
  profile_path: "/2ZulC2Ccq1yv3pemusks6Zlfy2s.jpg",
};

const photoUrl = `https://image.tmdb.org/t/p/w500${mockActor.profile_path}`;

const mockActorWithoutPhoto = {
  ...mockActor,
  profile_path: null,
};

const longName = `${mockActor.name.slice(0, 18)}...`;
const longCharacter = `${mockActor.character.slice(0, 30)}...`;

test("renders actor image with profile path", () => {
  const { getByRole } = render(<ActorCard actor={mockActor} />);

  expect(getByRole("img")).toBeInTheDocument();
  expect(getByRole("img")).toHaveAttribute("src", photoUrl);
});

test('renders "No photo!" for missing profile path', () => {
  const { getByText } = render(<ActorCard actor={mockActorWithoutPhoto} />);
  expect(getByText("No photo!")).toBeInTheDocument();
});

test("renders name with truncation", () => {
  const { getByText } = render(<ActorCard actor={mockActor} />);
  expect(getByText(longName)).toBeInTheDocument();
});

test("renders character with truncation", () => {
  const { getByText } = render(<ActorCard actor={mockActor} />);
  expect(getByText(longCharacter)).toBeInTheDocument();
});
