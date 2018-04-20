import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import theme from "../../../theme";
import FractionRow from "../FractionRow/index";
import Fraction from "../Fraction/index";
import Racer from "../../facc/Racer/index";

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

  renderRacerFractions = (currentFraction, currentCar) => {
    let fractions = [];
    for (let i = 0; i < 10; i++) {
      const fr = (
        <Fraction key={i} index={i} isCar={true}>
          {<FractionImg src={currentCar.image} shown={i === currentFraction} />}
        </Fraction>
      );
      fractions.push(fr);
    }
    return fractions;
  };
  renderRacers = cars => {
    let rows = [];
    for (let i = 0; i < cars.length; i++) {
      const Row = (
        <FractionRow key={i}>
          <Racer>
            {currentFraction => (
              <React.Fragment>
                {this.renderRacerFractions(currentFraction, cars[i])}
              </React.Fragment>
            )}
          </Racer>
        </FractionRow>
      );
      rows.push(Row);
    }
    return rows;
  };
  renderTableHeadings = () => {
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
      return (
        <Fraction key={i} index={i}>
          <span className="table-heading">{heading.value}</span>
        </Fraction>
      );
    });
  };
  render() {
    return (
      <Wrapper style={this.props.style}>
        <FractionRow>{this.renderTableHeadings()}</FractionRow>
        {this.renderRacers(this.props.cars)}
      </Wrapper>
    );
  }
}
