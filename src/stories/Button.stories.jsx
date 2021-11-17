import React from "react";

import { Button } from "./Button";

export default {
  title: "Components/Button",
  component: Button,
};

const Template = (args) => <Button {...args} />;

// Stories
export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: "Button",
};

export const Secondary = Template.bind({});
Secondary.args = {
  primary: false,
  label: "Button",
};

export const Large = Template.bind({});
Large.args = {
  primary: true,
  size: "large",
  label: "Button",
};
