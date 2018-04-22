import React from "react";
import PropTypes from "prop-types";
import "./index.css";

export function Button({ type, children, style, onClick }) {
  return (
    <button className={`btn btn-${type}`} style={style} onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  style: PropTypes.object,
  onClick: PropTypes.func.isRequired
};
