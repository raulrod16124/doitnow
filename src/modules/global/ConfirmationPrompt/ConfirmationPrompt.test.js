import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

import { ConfirmationPrompt } from "./ConfirmationPrompt";
import { ConfirmationPromptReducer } from "./state/reducer";

describe("Testing ConfirmationPrompt Component", () => {
  let mockStore;
  let wrapper;

  beforeEach(() => {
    const reducers = combineReducers({
      ConfirmationPromptReducer: ConfirmationPromptReducer,
    });
    mockStore = createStore(reducers, applyMiddleware(thunk));
    wrapper = render(
      <Provider store={mockStore}>
        <ConfirmationPrompt
          statusForTests={true}
          messageForTests="Do you want to delete the task TestingConfirmationPrompt ?"
        />
      </Provider>
    );
  });

  test("should render the ConfirmationPrompt component correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should find the text: Do you want to delete the task TestingConfirmationPrompt ?", () => {
    expect(
      screen.getByText(
        "Do you want to delete the task TestingConfirmationPrompt ?"
      )
    ).toBeInTheDocument();
  });

  test("should find the text: Cancel", () => {
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  test("should find the text: Accept", () => {
    expect(screen.getByText("Accept")).toBeInTheDocument();
  });
});
