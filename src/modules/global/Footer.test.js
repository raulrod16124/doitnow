import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Switch } from "react-router-dom";

import { Footer } from "./Footer";

describe("Testing Footer Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <MemoryRouter>
        <Switch>
          <Route>
            <Footer />
          </Route>
        </Switch>
      </MemoryRouter>
    );
  });

  test("should render the Footer component correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should find the text Disconnect", () => {
    expect(screen.getByText("Disconnect")).toBeInTheDocument();
  });
});
