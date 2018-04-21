import React from "react";
import PropTypes from "prop-types";

function FractionSpeedLimit({ started, speed }) {
  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        right: "10%",
        opacity: "0.3"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "25px",
          height: "25px",
          borderRadius: "100%",
          background: "white",
          border: "2px solid red",
          fontSize: "0.8rem"
        }}
      >
        <span
          style={{
            position: "relative",
            bottom: "0.5px",
            color: "black"
          }}
        >
          {speed}
        </span>
      </div>
    </div>
  );
}

FractionSpeedLimit.propTypes = {
  speed: PropTypes.number.isRequired
};

export default FractionSpeedLimit;
