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

  test("should not find role avatar until", () => {
    screen.debug();
  });
});
