import React from "react";
import "./SuccessfullyPlacedOrder.css";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Link } from "react-router-dom";

function SuccessfullyPlacedOrder() {
  return (
    <div className="successfullyPlacedOrder">
      <div className="card">
        <div className="circleIcon">
          <CheckCircleIcon />
        </div>
        <h3>Successfully Placed Order</h3>
        <Link to="/products">Back to shop</Link>
      </div>
    </div>
  );
}

export default SuccessfullyPlacedOrder;
