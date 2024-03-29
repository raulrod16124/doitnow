import React from "react";

import SpinnerLoading from "./../../assets/Spin-1s-200px.svg";

export const Loading = () => {
  return (
    <div className="loading">
      <div className="content-spinner">
        <img src={SpinnerLoading} alt="Loading spinner" />
        <h2 className="text">Loading</h2>
      </div>
    </div>
  );
};
