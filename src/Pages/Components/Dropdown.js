import React, { useEffect, useRef } from "react";

// the element that triggers the dropdown must have id="dropdown-toggle"

function Dropdown({ children, dropdownShow }) {
  return (
    <div className="dropdown">
      <div
        className="dropdown__children"
        style={{
          display: `${dropdownShow === true ? "" : "none"}`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default Dropdown;
