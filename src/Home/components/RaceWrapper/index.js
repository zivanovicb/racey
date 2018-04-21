import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import MediaQuery from "react-responsive";
import theme from "../../../theme";
import FractionRow from "../FractionRow/index";
import Fraction from "../Fraction/index";
import FractionTrafficLight from "../Fraction/FractionTrafficLight";
import FractionSpeedLimit from "../Fraction/FractionSpeedLimit";
import Racer from "../../facc/Racer/index";
import TrafficLight from "../TrafficLight/index";

const Wrapper = styled.div`
  width:100%;
  max-width:100%:
  overflow:hidden;
  background: ${theme.midGrey};
  padding: 10px;
`;

const FractionImg = styled.img`
  width: 52px;
  height: 28px;
  opacity: ${props => (props.shown ? "1" : "0")};
  @media screen and (max-width: 1200px) {
    width: 62px;
    height: 43px;
  }
`;

export default class RaceWrapper extends Component {
  state = {
    distance: this.props.distance,
    speedLimits: this.props.speedLimits,
    trafficLights: this.props.trafficLights,
    started: false,
    ended: false,
    elapsed: 0,
    awards: []
  };
  static propTypes = {
    cars: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        speed: PropTypes.number.isRequired
      })
    ),
    distance: PropTypes.number.isRequired,
    speedLimits: PropTypes.arrayOf(
      PropTypes.shape({
        position: PropTypes.number.isRequired,
        speed: PropTypes.number.isRequired
      })
    ),
    trafficLights: PropTypes.arrayOf(
      PropTypes.shape({
        position: PropTypes.number.isRequired,
        duration: PropTypes.number.isRequired
      })
    ),
    style: PropTypes.object
  };

  desktopFractions = 10;
  mobileFractions = 2;

  componentDidUpdate(prevProps) {
    if (this.props.trafficLights !== prevProps.trafficLights) {
      this.setState({ trafficLights: this.props.trafficLights });
    }
  }

  getEntitiesWithFractions = ({ entityType, totalFractions }) => {
    const { distance } = this.state;
    return this.state[entityType].map((entity, i) => {
      // Fraction key is where this specific entity should be located in
      return {
        ...entity,
        fraction: parseInt(entity.position * totalFractions / distance, 10)
      };
    });
  };

  renderRacerFractions = (currentFraction, currentCar, totalFractions) => {
    let fractions = [];

    const lightsWithFraction = this.getEntitiesWithFractions({
      totalFractions,
      entityType: "trafficLights"
    });
    const speedLimitsWithFraction = this.getEntitiesWithFractions({
      totalFractions,
      entityType: "speedLimits"
    });

    for (let i = 0; i < totalFractions; i++) {
      // It doesn't matter if there are any entities of that type found
      // Because here, we only attach if the indices match ⬇
      const trafficLight = lightsWithFraction.filter(
        (light, j) => light.fraction === i
      )[0];

      const speedLimit = speedLimitsWithFraction.filter(
        (speedLimit, k) => speedLimit.fraction === i
      )[0];
      const isMobile = totalFractions === 2;
      const fr = (
        <Fraction
          key={i}
          index={i}
          isCar={true}
          isMobile={isMobile}
          hasTrafficLight={!!trafficLight}
        >
          {<FractionImg src={currentCar.image} shown={i === currentFraction} />}
          {!!trafficLight &&
            !isMobile && <FractionTrafficLight red={trafficLight.red} />}
          {!!speedLimit &&
            !isMobile && (
              <FractionSpeedLimit
                started={this.state.started}
                speed={speedLimit.speed}
              />
            )}
        </Fraction>
      );
      fractions.push(fr);
    }
    return fractions;
  };

  renderRacers = ({ cars, fractions }) => {
    let rows = [];
    for (let i = 0; i < cars.length; i++) {
      const Row = (
        <FractionRow key={i}>
          <Racer>
            {currentFraction => (
              <React.Fragment>
                {this.renderRacerFractions(currentFraction, cars[i], fractions)}
              </React.Fragment>
            )}
          </Racer>
        </FractionRow>
      );
      rows.push(Row);
    }
    return rows;
  };
  renderTableHeadings = ({ fractions }) => {
    const isMobile = fractions === 2;

    const headings = [
      { value: "#" },
      {
        value: "f1"
      },
      { value: "f2" },
      { value: "f3" },
      { value: "f4" },
      { value: "f5" },
      { value: "f6" },
      { value: "f7" },
      { value: "f8" },
      { value: "f9" }
    ];

    // eslint-disable-next-line
    return headings.map((heading, i) => {
      if (i <= fractions - 1) {
        return (
          <Fraction key={i} index={i} isMobile={isMobile}>
            <span className="table-heading">
              {i === 1 && isMobile ? "Position" : heading.value}
            </span>
          </Fraction>
        );
      }
    });
  };

  renderTrafficLights = ({ trafficLights }) => {
    return trafficLights.map((light, i) => (
      <TrafficLight
        started={this.state.started}
        ended={this.state.ended}
        position={light.position}
        duration={light.duration}
        red={light.red}
        toggleTrafficLight={this.toggleTrafficLight}
        key={i}
      />
    ));
  };
  toggleTrafficLight = ({ position, red }) => {
    let trafficLight = this.state.trafficLights.filter(
      (light, i) => light.position === position
    )[0];
    trafficLight.red = red;

    this.setState(
      prevState => ({
        ...prevState,
        trafficLights: [...this.state.trafficLights, ...trafficLight]
      }),
      () => console.log(this.state)
    );
  };
  render() {
    return (
      <Wrapper style={this.props.style}>
        <MediaQuery minDeviceWidth={1200}>
          {matches => {
            if (matches) {
              return (
                <React.Fragment>
                  <FractionRow>
                    {this.renderTableHeadings({
                      fractions: this.desktopFractions
                    })}
                  </FractionRow>

                  {this.renderRacers({
                    cars: this.props.cars,
                    fractions: this.desktopFractions
                  })}

                  {this.renderTrafficLights({
                    trafficLights: this.state.trafficLights,
                    fractions: this.desktopFractions
                  })}

                  <button
                    onClick={() =>
                      this.setState({
                        started: !this.state.started,
                        ended: this.state.started ? true : false
                      })
                    }
                  >
                    OK
                  </button>
                </React.Fragment>
              );
            } else {
              return (
                <React.Fragment>
                  <FractionRow>
                    {this.renderTableHeadings({
                      fractions: this.mobileFractions
                    })}
                  </FractionRow>
                  {this.renderRacers({
                    cars: this.props.cars,
                    fractions: this.mobileFractions
                  })}
                </React.Fragment>
              );
            }
          }}
        </MediaQuery>
      </Wrapper>
    );
  }
}
