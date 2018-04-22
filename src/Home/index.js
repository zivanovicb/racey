import React, { Component } from "react";
import styled from "styled-components";
import MediaQuery from "react-responsive";
import theme from "../theme";
import Search from "./components/Search/index";
import data from "./data.json";
import CarCatalog from "./components/CarCatalog/index";
import RaceWrapper from "./components/RaceWrapper/index";
import { Button } from "../components/Button/index";

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

const ButtonHolder = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export default class Home extends Component {
  state = {
    searchValue: "",
    cars: data.cars,
    distance: data.distance,
    trafficLights: data.traffic_lights,
    speedLimits: data.speed_limits,
    catalogShown: true
  };

  componentDidMount() {
    this.setState({
      cars: this.makeCarsActive(this.state.cars),
      trafficLights: this.makeTrafficLightsRed(this.state.trafficLights)
    });
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
  makeTrafficLightsRed = trafficLights =>
    trafficLights.map((light, i) => ({ ...light, red: false }));

  toggleCarCatalog = () => {
    this.setState(prevState => ({
      ...prevState,
      catalogShown: !prevState.catalogShown
    }));
  };

  render() {
    return (
      <Wrapper>
        <Container>
          <Search handleInputChange={this.handleSearchChange} />
          <MediaQuery maxDeviceWidth={600}>
            <ButtonHolder>
              <Button type="secondary" onClick={this.toggleCarCatalog}>
                {this.state.catalogShown ? "HIDE CATALOG" : "SHOW CATALOG"}
              </Button>
            </ButtonHolder>
          </MediaQuery>

          <CarCatalog
            cars={this.state.cars}
            searchValue={this.state.searchValue}
            style={{
              display: this.state.catalogShown ? "block" : "none"
            }}
          />
          <RaceWrapper
            cars={this.state.cars}
            distance={this.state.distance}
            trafficLights={this.state.trafficLights}
            speedLimits={this.state.speedLimits}
            style={{ marginTop: "20px" }}
          />
        </Container>
      </Wrapper>
    );
  }
}
