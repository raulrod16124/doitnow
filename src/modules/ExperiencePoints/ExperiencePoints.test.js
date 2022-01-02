import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

import { TodosReducer } from "../Home/state/reducer";
import { ProfileReducer } from "../Profile/state/reducer";
import { ExperiencePoints } from "./ExperiencePoints";

describe("Testing ExperiencePoints component", () => {
  let mockStore;
  let wrapper;

  beforeEach(() => {
    const reducers = combineReducers({
      TodosReducer: TodosReducer,
      ProfileReducer: ProfileReducer,
    });
    mockStore = createStore(reducers, applyMiddleware(thunk));
    wrapper = render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <ExperiencePoints booleanForTest={true} />
        </MemoryRouter>
      </Provider>
    );
  });

  test("should render an ExperiencePoints component correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should find the img Role of the user avatar", () => {
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  test("should find the text Level Up", () => {
    expect(screen.getByText("Level Up")).toBeInTheDocument();
  });

  test("should find the button Role", () => {
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("should find the text Keep working hard", () => {
    expect(screen.getByText("Keep working hard")).toBeInTheDocument();
  });
});
