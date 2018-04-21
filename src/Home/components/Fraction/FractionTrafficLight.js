import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const FractionTrafficLight = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: "center";
`;

function FractionLight({ red }) {
  return (
    <FractionTrafficLight>
      <div
        style={{
          width: "10px",
          height: "10px",
          background: "rgba(18,255,0)",
          opacity: !red ? "1" : "0.2",
          marginBottom: "5px",
          borderRadius: "100%"
        }}
      />
      <div
        style={{
          width: "10px",
          height: "10px",
          background: "red",
          opacity: red ? "1" : "0.2",
          borderRadius: "100%"
        }}
      />
    </FractionTrafficLight>
  );
}

FractionLight.propTypes = {
  red: PropTypes.bool.isRequired
};

export default FractionLight;
