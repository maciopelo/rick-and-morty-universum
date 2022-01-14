import React from "react";
import "./Button.scss";

const Button = ({ text, onClick, ...rest }) => {
  return (
    <button className="button" onClick={onClick} {...rest}>
      {text}
    </button>
  );
};

export default Button;
