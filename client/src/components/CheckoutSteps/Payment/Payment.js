import React from "react";
import "./Payment.css";
import Badge from "@material-ui/core/Badge";

function Payment({ setPaymentMethod }) {
  return (
    <div className="payment">
      <div className="step__title">
        <h2>
          <span>2</span>Payment
        </h2>
        <div className="payment__info">
          <div className="payment__info__card">
            <div className="payment__option">
              <input
                type="radio"
                defaultValue="card"
                name="paymentMethod"
                defaultChecked
                id="card"
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
              />
              <label htmlFor="card">
                Pay with card{" "}
                <Badge badgeContent={"Recommended"} color="primary"></Badge>
              </label>
            </div>
            <img
              src="https://s13emagst.akamaized.net/layout/all/static-upload/credit_cards3.jpg"
              alt=""
            />
          </div>
          <div className="separator" />
          <div className="payment__info__cash">
            <div className="payment__option">
              <input
                type="radio"
                defaultValue="cash"
                name="paymentMethod"
                id="cashOnDelivery"
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
              />
              <label htmlFor="cashOnDelivery">Cash On Delivery</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
