import React from "react";

const SvgIcon = ({ icon, size, ...rest }) => {
  return (
    <div {...rest} style={{ height: size[0], width: size[1] }}>
      <img src={icon} alt="Icon" style={{ height: size[0], width: size[1] }} />
    </div>
  );
};

export default SvgIcon;
