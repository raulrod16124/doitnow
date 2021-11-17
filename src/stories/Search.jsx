import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

export const SearchInput = styled.input`
  padding: 1vmin;
  border-radius: 0.5vmin;
  /* font-size: 10vmin; */

  margin: ${(props) => (props.margin ? props.margin : ".5vmin")};
  width: ${(props) => (props.size ? props.size : "80")}%;
`;

export const Search = ({ className, size, margin, onChange }) => {
  return (
    <SearchInput
      className={className}
      onChange={onChange}
      margin={margin}
      size={size}
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
