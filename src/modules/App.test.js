import { mount, shallow } from "enzyme";

import App from "./App";

describe("Testing App Component", () => {
  let wrapper = shallow(<App />);

  test("should render App component correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should find one App className", () => {
    wrapper = mount(<App />);
    expect(wrapper.find(".App")).toHaveLength(1);
  });
});
