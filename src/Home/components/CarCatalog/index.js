import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Car from "../Car/index";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const Wrapper = styled.div`
  margin-top: 30px;
  @media screen and (max-width: 600px) {
    margin-top: 10px;
  }
  #carcatalog-wrapper {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
  }
`;
export default class extends Component {
  static propTypes = {
    cars: PropTypes.arrayOf(
      PropTypes.shape({
        image: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        speed: PropTypes.number.isRequired,
        active: PropTypes.bool
      })
    ),
    searchValue: PropTypes.string.isRequired,
    style: PropTypes.object
  };

  renderCars = cars => {
    return cars.map((car, i) => {
      return (
        <CSSTransition
          key={car.id}
          timeout={500}
          classNames="fade"
          appear={true}
        >
          <Car
            id={car.id}
            name={car.name}
            image={car.image}
            description={car.description}
            speed={car.speed}
            active={car.active}
            style={{
              margin: "5px"
            }}
          />
        </CSSTransition>
      );
    });
  };
  render() {
    return (
      <Wrapper {...this.props}>
        <TransitionGroup id="carcatalog-wrapper">
          {this.renderCars(this.props.cars)}
        </TransitionGroup>
      </Wrapper>
    );
  }
}
