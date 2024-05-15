import NavigationButtons from "../../../components/NavigationButtons";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import * as router from "react-router";

const navigate = jest.fn();

beforeEach(() => {
  jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
});

test("button click navigates to previous page", () => {
  const { getByText } = render(<NavigationButtons />);
  fireEvent.click(getByText("Go back"));

  expect(navigate).toHaveBeenCalledWith(-1);
});

test("button click navigates to home page", () => {
  const { getByText } = render(<NavigationButtons />);
  fireEvent.click(getByText("Home"));

  expect(navigate).toHaveBeenCalledWith("/");
});
