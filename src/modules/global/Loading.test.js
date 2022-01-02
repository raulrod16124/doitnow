import { render, screen } from "@testing-library/react";

import { Loading } from "./Loading";

describe("Testing Loading Compoent", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(<Loading />);
  });

  test("should render the Loading component correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should find the img Role of the spinner", () => {
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  test("should find the text Loading", () => {
    expect(screen.getByText("Loading")).toBeInTheDocument();
  });
});
