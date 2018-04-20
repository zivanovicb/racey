import { Component } from "react";
import PropTypes from "prop-types";

export default class TrafficLight extends Component {
  static propTypes = {
    duration: PropTypes.number.isRequired,
    position: PropTypes.number.isRequired,
    red: PropTypes.bool.isRequired,
    started: PropTypes.bool.isRequired,
    ended: PropTypes.bool.isRequired,
    toggleTrafficLight: PropTypes.func.isRequired
  };
  interval = null;

  static defaultProps = {
    red: false
  };

  componentDidUpdate(prevProps) {
    if (this.props.started !== prevProps.started && this.props.started) {
      this.interval = setInterval(() => {
        this.props.toggleTrafficLight({
          position: this.props.position,
          red: !this.props.red
        });
      }, this.props.duration);
    } else if (this.props.ended !== prevProps.ended && this.props.ended) {
      this.interval = clearInterval(this.interval);
    }
  }
  render() {
    return null;
  }
}
