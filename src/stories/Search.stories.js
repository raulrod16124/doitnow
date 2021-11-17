import React from "react";

import { Search } from "./Search";

export default {
  title: "Components/Search",
  component: Search,
};

const Template = (args) => <Search {...args} />;

// Stories
export const default_search = Template.bind({});
default_search.args = {};

export const short_search = Template.bind({});
short_search.args = {
  size: "20",
};

export const margin_search = Template.bind({});
margin_search.args = {
  size: "20",
  margin: "5vmin",
};
