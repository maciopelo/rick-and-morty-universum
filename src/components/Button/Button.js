import React from "react";
import "./Button.scss";

const Button = ({ text, onClick, ...rest }) => {
  return (
    <button className="button" onClick={onClick} {...rest}>
      <span className="button__text">{text}</span>
    </button>
  );
};

export default Button;
