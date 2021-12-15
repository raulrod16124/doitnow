import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

export const SearchInput = styled.input`
  padding: 1vmin;
  border-radius: 0.5vmin;
  background: #ececec;
  border: none;

  margin: ${(props) => (props.margin ? props.margin : ".5vmin")};
  width: ${(props) => (props.width ? props.width : "80")}%;
  height: ${(props) => props.height && props.height}vh;
`;

export const Search = ({
  className,
  width,
  height,
  margin,
  autoFocus,
  onChange,
}) => {
  return (
    <SearchInput
      className={className}
      onChange={onChange}
      margin={margin}
      width={width}
      height={height}
      type="search"
      placeholder="Search"
      autoFocus={autoFocus}
    />
  );
};

Search.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  margin: PropTypes.string,
  size: PropTypes.string,
};
