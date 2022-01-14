import React from "react";

const SvgIcon = ({ icon, size, ...rest }) => {
  const sizes = size ? { height: size[0], width: size[1] } : {};
  return (
    <div {...rest} style={sizes}>
      <img src={icon} alt="Icon" style={sizes} />
    </div>
  );
};

export default SvgIcon;
