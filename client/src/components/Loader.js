import React from "react";
import "../constants/Loader.css";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
  <div style={{ display: "flex", justifyContent: "center", margin: ".5rem" }}>
    <div className="lds-roller">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);
