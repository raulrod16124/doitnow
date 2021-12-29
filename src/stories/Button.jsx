import "./button.css";

import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const Btn = styled.button`
  cursor: pointer;
  border: none;
  font-size: 2rem;
  font-weight: 700;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all.3s ease-out;

  width: ${(props) => (props.width ? props.width : "auto")};
  height: ${(props) => (props.height ? props.height : "4rem")};
  color: ${(props) => (props.primary ? "#2c666e" : "#ffffff")};
  background-color: ${(props) => (props.primary ? "#ffffff" : "#2c666e")};
  border: 0.2rem solid ${(props) => (props.primary ? "transparent" : "#2c666e")};

  @media (max-width: 900px) {
    font-size: 1.2rem;
    padding: 1rem;
    border-radius: 0.8rem;
  }
`;

export const Button = ({ label, primary, width, height, ...props }) => {
  return (
    <Btn type="submit" width={width} height={height} {...props}>
      {label}
    </Btn>
  );
};

Button.propTypes = {
  primary: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

Button.defaultProps = {
  primary: false,
};
