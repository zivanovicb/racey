import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Racer extends Component {
  state = {
    fraction: 1
  };
  render() {
    return (
      <React.Fragment>
        {this.props.children(this.state.fraction)}
      </React.Fragment>
    );
  }
}
