import React from "react";

const Control = ({ btState, onClick }) => (
  <button className="btn" onClick={onClick}>{btState}</button>
);

export default Control;
