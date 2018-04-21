import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Racer extends Component {
  state = {
    position: 0,
    maxSpeed: this.props.maxSpeed,
    currentSpeed: this.props.maxSpeed / 150,
    driving: false
    // Will have traffic lights spread over state as objects
    // tf1: {}, tf2: {} and so on
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
          driving: true,
          position: prevState.position + prevState.currentSpeed
        };
      });
    }, refreshRate);
  };

  // Sets speed which is guided by speed limits
  setCurrentSpeed = (speedLimits, stopped) => {
    for (let i = 0; i < speedLimits.length; i++) {
      if (this.state.position >= speedLimits[i].position) {
        this.setState(prevState => {
          return {
            ...prevState,
            currentSpeed: stopped ? 0 : speedLimits[i].speed / 150
          };
        });
      }
    }
  };

  spreadTrafficLights = (trafficLights, cb) => {
    const state = {};
    for (let i = 0; i < trafficLights.length; i++) {
      state["tf" + i] = trafficLights[i];
    }
    this.setState({ ...state }, cb);
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    let reds = this.props.trafficLights.filter(
      (light, i) => light.red === true
    );

    // When a race starts we setup the interval
    if (this.props.started !== prevProps.started && this.props.started) {
      this.setupInterval(this.props.refreshRate);
    }

    // We React to on the driving boolean
    // As soon as it changes from false to true we change current speed
    // And we have setInterval which will use that current speed to move cars
    if (this.state.driving !== prevState.driving && this.state.driving) {
      this.setCurrentSpeed(this.sortedSpeedLimits);
    }

    // No red lights anymore
    if (reds.length === 0 && !this.state.driving) {
      this.setState({ driving: true });
    } else {
      // RED LIGHT IS ON!
      // We iterate over each light to see if we are nearby and if we should stop
      for (let i = 0; i < reds.length; i++) {
        if (
          this.state.driving &&
          this.state.position < reds[i].position &&
          this.state.position > reds[i].position - 5
        ) {
          this.setState(prevState => ({
            ...prevState,
            driving: false
          }));
        }
      }
    }

    // Traffic lights have red(bool) property assigned
    // We wait until traffic lights are transform(they get red property)
    // And spread them onto this component's state
    if (
      this.props.trafficLights[0].red !== prevProps.trafficLights[0].red &&
      this.props.trafficLights[0].hasOwnProperty("red")
    ) {
      this.spreadTrafficLights(this.props.trafficLights);
    }

    // When traffic lights CHANGE we spread them all over this component's state
    if (this.props.trafficLights !== prevProps.trafficLights) {
      this.spreadTrafficLights(this.props.trafficLights);
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
