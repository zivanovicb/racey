import React, { Component } from "react";
import PropTypes from "prop-types";

const SPEED_CONST = 380;

export default class Racer extends Component {
  state = {
    position: 0,
    maxSpeed: this.props.maxSpeed,
    currentSpeed: this.props.maxSpeed / SPEED_CONST,
    driving: false,
    finished: false
    // Will have traffic lights spread over state as objects
    // tf1: {}, tf2: {} and so on
  };
  interval = null;
  sortedSpeedLimits = [];

  static propTypes = {
    id: PropTypes.number.isRequired,
    maxSpeed: PropTypes.number.isRequired,
    started: PropTypes.bool.isRequired,
    paused: PropTypes.bool.isRequired,
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
    ),
    addToRankings: PropTypes.func.isRequired
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

  // Sets speed which is guided by speed limits
  setCurrentSpeed = (speedLimits, stopped) => {
    for (let i = 0; i < speedLimits.length; i++) {
      if (this.state.position >= speedLimits[i].position) {
        this.setState(prevState => {
          return {
            ...prevState,
            currentSpeed: stopped ? 0 : speedLimits[i].speed / SPEED_CONST
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
      this.setState({
        position: 0,
        currentSpeed: this.props.maxSpeed / SPEED_CONST
      });
      this.setupInterval(this.props.refreshRate);
    }

    // Trafic lights make racer go driving:false
    // When that happens we change speed to 0
    if (this.state.driving !== prevState.driving && !this.state.driving) {
      this.setCurrentSpeed(this.sortedSpeedLimits, true);
    }

    // No red lights anymore
    if (reds.length === 0 && !this.state.driving && !this.state.finished) {
      this.setState({ driving: true });
    } else {
      // RED LIGHT IS ON!
      // We iterate over each light to see if we are nearby and if we should stop
      for (let i = 0; i < reds.length; i++) {
        if (
          this.state.driving &&
          this.state.position < reds[i].position &&
          this.state.position > reds[i].position - 2
        ) {
          this.setState(prevState => ({
            ...prevState,
            driving: false
          }));
        }
      }
    }

    // We have to calculate speed each time car moves, we don't want to miss speed limits
    if (this.state.position !== prevState.position) {
      this.setCurrentSpeed(this.sortedSpeedLimits);
    }

    // We React on the driving boolean
    // As soon as it changes from false to true we change current speed
    // And we have interval which will use that current speed to move cars
    if (this.state.driving !== prevState.driving && this.state.driving) {
      this.setCurrentSpeed(this.sortedSpeedLimits);
    } else if (
      this.state.finished !== prevState.finished &&
      this.state.finished
    ) {
      clearInterval(this.interval);
      this.props.addToRankings({ id: this.props.id });
    }

    // Racer ends race
    if (
      this.state.position !== prevState.position &&
      this.state.position >= 50
    ) {
      this.setState({ driving: false, finished: true });
    }

    // Traffic lights have red(bool) property assigned
    // We wait until traffic lights are transformed(they get tue "red" property)
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
    const isSlowedDown =
      this.state.currentSpeed !== this.state.maxSpeed / SPEED_CONST;
    const currentSpeed = parseInt(this.state.currentSpeed * SPEED_CONST, 10);
    return (
      <React.Fragment>
        {this.props.children(this.state.position, isSlowedDown, currentSpeed)}
      </React.Fragment>
    );
  }
}
