import React, { Component } from "react";
import styled from "styled-components";
import theme from "../theme";
import Search from "./components/Search/index";
import data from "./data.json";
import CarCatalog from "./components/CarCatalog/index";

const Wrapper = styled.div`
  width: 100%;
  max-width: 100%;
  height: 2000px;
  background: ${theme.lightGrey};
  overflow: hidden;
`;

const Container = styled.div`
  display: flex;
  width: 1187px;
  margin: 0 auto;
  padding-top: 40px;
  padding-bottom: 40px;
  flex-flow: column nowrap;
  @media screen and (max-width: 1187px) {
    width: 90%;
  }
`;
export default class Home extends Component {
  state = {
    searchValue: ""
  };

  handleSearchChange = e => this.setState({ searchValue: e.target.value });

  render() {
    return (
      <Wrapper>
        <Container>
          <Search handleInputChange={this.handleSearchChange} />
          <CarCatalog
            style={{ marginTop: "30px" }}
            cars={data.cars}
            searchValue={this.state.searchValue}
          />
        </Container>
      </Wrapper>
    );
  }
}
