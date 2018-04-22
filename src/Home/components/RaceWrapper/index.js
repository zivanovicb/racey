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
  transition: all 0.5s ease-in-out;
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
    rankings: []
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

  componentDidUpdate(prevProps, prevState) {
    if (this.props.trafficLights !== prevProps.trafficLights) {
      this.setState({ trafficLights: this.props.trafficLights });
    }
    if (
      this.state.rankings.length !== prevState.rankings.length &&
      this.state.rankings.length === 5
    ) {
      // Trafic lights need ended bool
      this.setState({ started: false, ended: true });
    }
  }

  addToRankings = racer =>
    this.setState(
      prevState => ({
        ...prevState,
        rankings: [...prevState.rankings, racer]
      }),
      () => console.log("THISHSIHSISHIS", this.state)
    );

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

  getRacerFraction = ({ currentPosition, totalFractions }) => {
    const { distance } = this.state;
    return parseInt(currentPosition * totalFractions / distance, 10);
  };

  getRacerRank = id => {
    let rank;
    this.state.rankings.filter((racer, i) => {
      if (racer.id === id) rank = i + 1;
      return racer.id === id;
    });
    return rank;
  };
  renderRacerFractions = (
    currentPosition,
    currentCar,
    totalFractions,
    isSlowedDown,
    currentSpeed
  ) => {
    let fractions = [];

    const lightsWithFraction = this.getEntitiesWithFractions({
      totalFractions,
      entityType: "trafficLights"
    });
    const speedLimitsWithFraction = this.getEntitiesWithFractions({
      totalFractions,
      entityType: "speedLimits"
    });

    let currentFraction = this.getRacerFraction({
      currentPosition,
      totalFractions
    });

    if (currentFraction >= 10) {
      currentFraction = 9;
    }

    for (let i = 0; i < totalFractions; i++) {
      // It doesn't matter if there are any entities of that type found
      // Because here, we only attach if the indices match ⬇
      const trafficLight = lightsWithFraction.filter(
        (light, j) => light.fraction === i
      )[0];

      const speedLimit = speedLimitsWithFraction.filter(
        (speedLimit, k) => speedLimit.fraction === i
      )[0];

      const fractionsMatch = i === currentFraction;
      const isMobile = totalFractions === 2;
      const isFractionSlowedDown = isSlowedDown && fractionsMatch;

      let rank;
      if (currentFraction === 9) rank = this.getRacerRank(currentCar.id);

      const fr = (
        <Fraction
          key={i}
          index={i}
          isCar={true}
          isMobile={isMobile}
          isSlowedDown={isFractionSlowedDown}
          hasTrafficLight={!!trafficLight}
        >
          {i === 0 &&
            currentFraction !== i && (
              <span style={{ position: "absolute", color: theme.blue }}>
                #{currentCar.id}
              </span>
            )}
          {<FractionImg src={currentCar.image} shown={fractionsMatch} />}
          {!!trafficLight &&
            !isMobile && <FractionTrafficLight red={trafficLight.red} />}

          {!!speedLimit &&
            currentFraction !== 9 &&
            !isMobile && <FractionSpeedLimit speed={speedLimit.speed} />}

          {isFractionSlowedDown &&
            !isMobile && (
              <span
                style={{
                  position: "absolute",
                  bottom: "5px",
                  color: "white",
                  fontSize: "0.5rem"
                }}
              >
                {currentSpeed}km/h
              </span>
            )}

          {!!rank &&
            fractionsMatch && (
              <span
                style={{
                  position: "absolute",
                  top: "2px",
                  color: theme.blue
                }}
              >
                {rank}
              </span>
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
          <Racer
            id={cars[i].id}
            maxSpeed={cars[i].speed}
            started={this.state.started}
            speedLimits={this.state.speedLimits}
            trafficLights={this.state.trafficLights}
            addToRankings={this.addToRankings}
            refreshRate={300}
          >
            {(currentPosition, isSlowedDown, currentSpeed) => (
              <React.Fragment>
                {this.renderRacerFractions(
                  currentPosition,
                  cars[i],
                  fractions,
                  isSlowedDown,
                  currentSpeed
                )}
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
        position={light.position}
        duration={light.duration}
        red={light.red}
        toggleTrafficLight={this.toggleTrafficLight}
        ended={this.state.ended}
        key={i}
      />
    ));
  };
  toggleTrafficLight = ({ position, red }) => {
    let trafficLight = this.state.trafficLights.filter(
      (light, i) => light.position === position
    )[0];
    trafficLight.red = red;

    this.setState(prevState => ({
      ...prevState,
      trafficLights: [...this.state.trafficLights, ...trafficLight]
    }));
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
