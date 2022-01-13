import React from "react";
import universe from "../../assets/universe.svg";
import "./Logo.scss";

const Logo = () => {
  return (
    <div className="logo">
      <span className="logo__text">
        Rick and Morty Universum
        <img className="logo__icon" src={universe} alt="Universe" />
      </span>
    </div>
  );
};

export default Logo;
