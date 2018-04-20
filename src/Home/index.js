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
    searchValue: "",
    cars: data.cars
  };

  componentDidMount() {
    this.setState({ cars: this.makeCarsActive(this.state.cars) });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.searchValue !== prevState.searchValue) {
      const cars = this.state.cars.map((car, i) => {
        return {
          ...car,
          active:
            car.name
              .toLowerCase()
              .indexOf(this.state.searchValue.toLowerCase()) >= 0
              ? true
              : false
        };
      });
      this.setState({ cars });
    }
  }

  handleSearchChange = e => this.setState({ searchValue: e.target.value });
  makeCarsActive = cars => cars.map((car, i) => ({ ...car, active: true }));

  render() {
    return (
      <Wrapper>
        <Container>
          <Search handleInputChange={this.handleSearchChange} />
          <CarCatalog
            style={{ marginTop: "30px" }}
            cars={this.state.cars}
            searchValue={this.state.searchValue}
          />
        </Container>
      </Wrapper>
    );
  }
}
