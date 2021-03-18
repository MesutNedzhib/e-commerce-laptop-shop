import React, { useEffect } from "react";
import { useState } from "react";
import "./OrderItem.css";

function OrderItem({ orderItems, date, totalPrice }) {
  let [imageCount, setImageCount] = useState([]);
  let [nameCount, setNameCount] = useState([]);

  useEffect(() => {
    let countImage = [];
    let countName = [];
    if (orderItems) {
      for (let item of orderItems) {
        countImage.push(item.image);
        setImageCount(countImage);
        countName.push(item.name);
        setNameCount(countName);
      }
    }
  }, [orderItems]);

  return (
    <div className="order__item">
      <div className="item__image">
        {imageCount[0] ? (
          <img src={imageCount[0]} alt="" className={`item__image__1`} />
        ) : (
          <></>
        )}

        {imageCount[1] ? (
          <img src={imageCount[1]} alt="" className={`item__image__2`} />
        ) : (
          <></>
        )}
        {imageCount[2] ? (
          <span className="item__image__3">+</span>
        ) : (
          <span></span>
        )}
      </div>
      <div className="item__name">
        {nameCount[0] ? nameCount[0] : <></>}
        {nameCount[1] ? ", " + nameCount[1] : <></>}
        {nameCount[2] ? " ..." : <></>}
      </div>
      <div className="item__date">{date}</div>
      <div className="item__total">${totalPrice}</div>
    </div>
  );
}

export default OrderItem;
