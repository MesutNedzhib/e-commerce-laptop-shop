import React from "react";
import "./LocationBar.css";
import { useHistory } from "react-router-dom";

function LocationBar({ arr, path }) {
  const history = useHistory();

  const setDirect = (index) => {
    for (let i = 0; i < path.length; i++) {
      if (i === index) {
        history.push(path[i]);
      }
    }
  };

  return (
    <div className="location__bar">
      <ul>
        {arr.map((item, index) => (
          <li key={index} onClick={() => setDirect(index)}>
            <span className="title">{item.toUpperCase()}</span>
            <span>{index !== arr.length - 1 ? ">" : <></>}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LocationBar;
