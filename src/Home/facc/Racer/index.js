import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Racer extends Component {
  state = {
    position: 0,
    maxSpeed: this.props.maxSpeed,
    currentSpeed: this.props.maxSpeed / 150
  };
  interval = null;
  sortedSpeedLimits = [];

  static propTypes = {
    started: PropTypes.bool.isRequired,
    maxSpeed: PropTypes.number.isRequired,
    refreshRate: PropTypes.number.isRequired,
    speedLimits: PropTypes.arrayOf(
      PropTypes.shape({
        speed: PropTypes.number.isRequired,
        position: PropTypes.number.isRequired
      })
    ),
    trafficLights: PropTypes.arrayOf(
      PropTypes.shape({
        position: PropTypes.number.isRequired,
        duration: PropTypes.number.isRequired
      })
    )
  };
  componentDidMount() {
    this.sortedSpeedLimits = this.props.speedLimits.sort(
      (a, b) => a.position - b.position
    );
  }

  setupInterval = refreshRate => {
    this.interval = setInterval(() => {
      this.setState(prevState => {
        return {
          ...prevState,
          position: prevState.position + prevState.currentSpeed
        };
      });
    }, refreshRate);
  };

  calculateSpeed = speedLimits => {
    for (let i = 0; i < speedLimits.length; i++) {
      if (this.state.position >= speedLimits[i].position) {
        this.setState(prevState => {
          return {
            ...prevState,
            currentSpeed: speedLimits[i].speed / 150
          };
        });
      }
    }
  };
  componentDidUpdate(prevProps, prevState) {
    // When a race starts we setup the interval
    if (this.props.started !== prevProps.started && this.props.started) {
      this.setupInterval(this.props.refreshRate);
    }

    if (
      this.state.position !== prevState.position &&
      this.state.position !== 0
    ) {
      this.calculateSpeed(this.sortedSpeedLimits);
    }
  }
  render() {
    const isSlowedDown = this.state.currentSpeed !== this.state.maxSpeed / 150;
    const currentSpeed = parseInt(this.state.currentSpeed * 150, 10);
    return (
      <React.Fragment>
        {this.props.children(this.state.position, isSlowedDown, currentSpeed)}
      </React.Fragment>
    );
  }
}
