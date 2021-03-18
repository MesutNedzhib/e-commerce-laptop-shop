import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./LoadingBox.css";

function LoadingBox() {
  return (
    <div className="loading__box">
      <CircularProgress size="10rem" thickness={2.5} />
    </div>
  );
}

export default LoadingBox;
