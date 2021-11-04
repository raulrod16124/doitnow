import { mount } from "enzyme";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";

import { TodosReducer } from "../state/reducer";
import { Home } from "./Home";

describe("Visual Tests of Home Component", () => {
  let mockStore;
  let wrapper;

  beforeAll(() => {
    const reducers = combineReducers({
      TodosReducer: TodosReducer,
    });
    mockStore = createStore(reducers);
    wrapper = mount(
      <Provider store={mockStore}>
        <Home />
      </Provider>
    );
  });

  test("should render Home component correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

// describe("Functinonality Tests of Home Component", () => {
//   let mockStore;
//   let wrapper;

//   beforeAll(() => {
//     const reducers = combineReducers({
//       TodosReducer: TodosReducer,
//     });
//     mockStore = createStore(reducers);
//     wrapper = mount(
//       <Provider store={mockStore}>
//         <Home />
//       </Provider>
//     );
//   });

// });
