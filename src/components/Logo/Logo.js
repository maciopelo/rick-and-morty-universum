import React from "react";
import universe from "../../assets/universe.svg";
import { Link } from "react-router-dom";
import "./Logo.scss";

const Logo = () => {
  return (
    <Link to="/">
      <div className="logo">
        <span className="logo__text">
          Rick and Morty Universum
          <img className="logo__icon" src={universe} alt="Universe" />
        </span>
      </div>
    </Link>
  );
};

export default Logo;
