import React from "react";
import "./MessageBox.css";

function MessageBox({ message, variant }) {
  return <div className={`message__box alert-${variant}`}>{message}</div>;
}

export default MessageBox;
