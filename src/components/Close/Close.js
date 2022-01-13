import React from "react";
import "./Close.scss";

const Close = ({ onClick }) => {
  return (
    <div className="close-wrapper">
      <span className="close" onClick={onClick} />
    </div>
  );
};

export default Close;
