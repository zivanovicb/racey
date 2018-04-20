import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import theme from "../../../theme";
import FractionRow from "../FractionRow/index";
import Fraction from "../Fraction/index";
import Racer from "../../facc/Racer/index";
import MediaQuery from "react-responsive";

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
    fractionsNum: 9,
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

  renderRacerFractions = (currentFraction, currentCar, totalFractions) => {
    let fractions = [];
    for (let i = 0; i < totalFractions; i++) {
      const fr = (
        <Fraction
          key={i}
          index={i}
          isCar={true}
          isMobile={totalFractions === 2}
        >
          {<FractionImg src={currentCar.image} shown={i === currentFraction} />}
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
  render() {
    return (
      <Wrapper style={this.props.style}>
        <MediaQuery minDeviceWidth={1200}>
          {matches => {
            if (matches) {
              return (
                <React.Fragment>
                  <FractionRow>
                    {this.renderTableHeadings({ fractions: 10 })}
                  </FractionRow>
                  {this.renderRacers({ cars: this.props.cars, fractions: 10 })}
                </React.Fragment>
              );
            } else {
              return (
                <React.Fragment>
                  <FractionRow>
                    {this.renderTableHeadings({ fractions: 2 })}
                  </FractionRow>
                  {this.renderRacers({ cars: this.props.cars, fractions: 2 })}
                </React.Fragment>
              );
            }
          }}
        </MediaQuery>
      </Wrapper>
    );
  }
}
