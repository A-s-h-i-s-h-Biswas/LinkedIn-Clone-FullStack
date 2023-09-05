import React from "react";

const ToggleDisplay = ({ label, state ,stateChanger }) => {
  
  const showLebel = `Show ${state ? ` all` : " less "}${label}`;
  return (
    <p
      onClick={stateChanger}
      className="font-bold text-center  opacity-50  cursor-pointer hover:text-blue-600 hover:underline"
    >
      {showLebel}
    </p>
  );
};

export default ToggleDisplay;
