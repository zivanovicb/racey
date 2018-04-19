import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Car from "../Car/index";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
`;
export default class extends Component {
  state = {
    cars: this.props.cars
  };
  static propTypes = {
    cars: PropTypes.arrayOf(
      PropTypes.shape({
        image: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        speed: PropTypes.number.isRequired
      })
    ),
    searchValue: PropTypes.string.isRequired,
    style: PropTypes.object
  };

  componentDidUpdate(prevProps) {
    if (this.props.searchValue !== prevProps.searchValue) {
      const cars = this.props.cars.filter((car, i) => {
        return (
          car.name
            .toLowerCase()
            .indexOf(this.props.searchValue.toLowerCase()) >= 0
        );
      });
      this.setState({ cars });
    }
  }
  renderCars = cars => {
    return cars.map((car, i) => {
      return (
        <Car
          key={i}
          id={car.id}
          name={car.name}
          image={car.image}
          description={car.description}
          speed={car.speed}
          style={{ margin: "5px" }}
        />
      );
    });
  };
  render() {
    return (
      <Wrapper {...this.props}>{this.renderCars(this.state.cars)}</Wrapper>
    );
  }
}
