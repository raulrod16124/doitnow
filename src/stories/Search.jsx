import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

export const SearchInput = styled.input`
  padding: 1vmin;
  border-radius: 0.5vmin;
  border: 0.2vmin solid #aaa;

  margin: ${(props) => (props.margin ? props.margin : ".5vmin")};
  width: ${(props) => (props.width ? props.width : "80")}%;
  height: ${(props) => props.height && props.height}vh;
  border: ${(props) => props.borderNone && "none"};
`;

export const Search = ({
  className,
  width,
  height,
  borderNone,
  margin,
  onChange,
}) => {
  return (
    <SearchInput
      className={className}
      onChange={onChange}
      margin={margin}
      width={width}
      height={height}
      borderNone={borderNone}
      type="search"
      placeholder="Search"
    />
  );
};

Search.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  margin: PropTypes.string,
  size: PropTypes.string,
};
