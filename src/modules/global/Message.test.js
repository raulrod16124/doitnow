import { render, screen } from "@testing-library/react";

import { Message } from "./Message";

describe("Testing Message component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(<Message children="Message from test" />);
  });

  test("should render the Message component correclty", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should find the text: Message from test", () => {
    expect(screen.getByText("Message from test")).toBeInTheDocument();
  });

  // TODO - Search about test props in react testing library
});
