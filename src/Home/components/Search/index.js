import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import theme from "../../../theme";
import searchIcon from "../../img/search.svg";

const Input = styled.input`
  color: ${theme.midGrey};
  font-size: 1.2rem;
  padding: 1rem 1.2rem;
  width: 450px;
  border-radius: 2px;
  border: none;
  background-color: rgba(255, 255, 255, 0.9);
  background-image: url(${searchIcon});
  background-repeat: no-repeat;
  background-position: 95% center;
  background-size: 26px;
  @media screen and (max-width: 500px) {
    width: 100%;
    background-image: none;
  }
`;

function Search({ handleInputChange }) {
  return (
    <Input
      type="text"
      onChange={handleInputChange}
      placeholder="Search by car name"
    />
  );
}

Search.propTypes = {
  handleInputChange: PropTypes.func.isRequired
};
export default Search;
