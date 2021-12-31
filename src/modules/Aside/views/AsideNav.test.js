import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Switch } from "react-router-dom";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

import { AsideReducer } from "../state/reducer";
import { AsideNav } from "./AsideNav";

describe("Testing AsideNav component", () => {
  let mockStore;
  let wrapper;

  beforeEach(() => {
    const reducers = combineReducers({
      AsideReducer: AsideReducer,
    });
    mockStore = createStore(reducers, applyMiddleware(thunk));
    wrapper = render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <AsideNav />
        </MemoryRouter>
      </Provider>
    );
  });

  test("should render AsideNav component correclty", () => {
    expect(wrapper).toMatchSnapshot();
  });

  // Add text to detect the App Logo

  test("should find a img Role", () => {
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  test("should find a Home text", () => {
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  test("should find a Today text", () => {
    expect(screen.getByText("Today")).toBeInTheDocument();
  });

  test("should find a Calendar text", () => {
    expect(screen.getByText("Calendar")).toBeInTheDocument();
  });

  test("should find a Profile text", () => {
    expect(screen.getByText("Profile")).toBeInTheDocument();
  });

  test("should find a Account text", () => {
    expect(screen.getByText("Account")).toBeInTheDocument();
  });

  test("should find a Disconnect text", () => {
    expect(screen.getByText("Disconnect")).toBeInTheDocument();
  });
});

describe("Testing functionality of AsideNav component", () => {
  let mockStore;
  let wrapper;

  let testHistory;

  beforeEach(() => {
    const reducers = combineReducers({
      AsideReducer: AsideReducer,
    });
    mockStore = createStore(reducers, applyMiddleware(thunk));
    wrapper = render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <AsideNav />
          <Switch>
            <Route
              path={`*`}
              render={(routeProps) => {
                testHistory = routeProps.history;
                return null;
              }}
            />
          </Switch>
        </MemoryRouter>
      </Provider>
    );
  });

  test("should find a / path as an initial path", () => {
    // console.log(testHistory.location.pathname);
    expect(testHistory.location.pathname).toEqual("/");
  });
});
