import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import theme from "../../../theme";
import FractionRow from "../FractionRow/index";
import Fraction from "../Fraction/index";

const Wrapper = styled.div`
  width:100%;
  max-width:100%:
  overflow:hidden;
  background: ${theme.midGrey};
  padding: 10px;
`;

export default class RaceWrapper extends Component {
  state = {
    fractionsNum: 9
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
    style: PropTypes.object
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
      console.log("III", i);
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
      </Wrapper>
    );
  }
}
