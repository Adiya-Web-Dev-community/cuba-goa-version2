import React from "react";
import "./OverLay.css";

const OverLay = ({ children, onclose, value }) => {
  return (
    <div
      onClick={onclose}
      className={` ${value ? "overlay_visible" : "overlay_parent"} `}
    >
      {children}
    </div>
  );
};

export default OverLay;
