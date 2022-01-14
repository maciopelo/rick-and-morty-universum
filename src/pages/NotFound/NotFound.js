import React from "react";
import "./NotFound.scss";
import morty from "../../assets/morty.png";

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-page__message">
        <span>Not found</span>
        <img src={morty} alt="Morty" />
      </div>
    </div>
  );
};

export default NotFound;
