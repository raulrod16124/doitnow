import { render, screen } from "@testing-library/react";
import React from "react";

import App from "./App";

describe("Testing App Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(<App />);
  });

  test("should render App component correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should find a img Role", () => {
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  test("should find a Login title", () => {
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  test("should find a textbox Role", () => {
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test("should find a placeholder Email", () => {
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
  });

  test("should find a placeholder Password", () => {
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });

  test("should find a Role of link", () => {
    expect(screen.getByRole("link")).toBeInTheDocument();
  });

  test("should find a Role of Button", () => {
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("should find a Role of Button", () => {
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
