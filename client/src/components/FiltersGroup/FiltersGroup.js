import React from "react";
import { useDispatch } from "react-redux";
import "./FiltersGroup.css";
import { useHistory } from "react-router-dom";
import {
  getProductList,
  getProductsByFilter,
  getProductsByName,
  setSortOption,
} from "../../actions/productActions";

function FiltersGroup({ name, active, list }) {
  const dispatch = useDispatch();

  const history = useHistory();

  const getCheckboxValues = () => {
    // window.scroll(0, 0);
    let manufacturer = getFilter(
      document.getElementsByClassName("Manufacturer")
    ).value;
    let processor = getFilter(document.getElementsByClassName("Processor"))
      .value;
    let memory = getFilter(document.getElementsByClassName("Memory")).value;
    let storage = getFilter(document.getElementsByClassName("Storage")).value;
    let video = getFilter(document.getElementsByClassName("Video")).value;

    const send = createObjectForSend(
      manufacturer,
      processor,
      memory,
      storage,
      video
    );

    let gg = {};
    gg.brand = getFilter(
      document.getElementsByClassName("Manufacturer")
    ).newList;
    gg.processor = getFilter(
      document.getElementsByClassName("Processor")
    ).newList;
    gg.memory = getFilter(document.getElementsByClassName("Memory")).newList;
    gg.storage = getFilter(document.getElementsByClassName("Storage")).newList;
    gg.video = getFilter(document.getElementsByClassName("Video")).newList;

    if (localStorage.getItem("filter")) {
      let filter = JSON.parse(localStorage.getItem("filter"));
      filter.filter = send;
      filter.filterList = gg;
      localStorage.setItem("filter", JSON.stringify(filter));
    } else {
      localStorage.setItem(
        "filter",
        JSON.stringify({ filter: send, filterList: gg })
      );
    }

    if (Object.keys(send).length === 0) {
      history.push("/products");
      dispatch(getProductsByFilter(send));
      dispatch(setSortOption("A-Z"));
      localStorage.removeItem("filter");
    } else {
      dispatch(getProductsByFilter(send));
    }
  };

  const serachFilterHandler = (value) => {
    if (value !== "") {
      dispatch(getProductsByName(value));
    } else {
      dispatch(getProductList());
    }
  };

  return (
    <div className="filters__group">
      <div className="filters__group__name">
        <h3>{name}</h3>
      </div>
      {active ? (
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => serachFilterHandler(e.target.value)}
        />
      ) : (
        <></>
      )}
      <div className="filters__group__body">
        <ul>
          {list?.map((item, index) =>
            item.hide === true ? (
              <li key={index}>
                <></>
              </li>
            ) : (
              <label htmlFor={item.name} key={index}>
                <li key={index}>
                  <input
                    type="checkbox"
                    id={item.name}
                    defaultValue={item.name}
                    defaultChecked={item.isChecked}
                    onClick={() => getCheckboxValues()}
                    className={`${name}`}
                  />
                  {item.name === "4" ||
                  item.name === "8" ||
                  item.name === "16" ? (
                    <label htmlFor={item.name}>{item.name} GB</label>
                  ) : (
                    <label htmlFor={item.name}>
                      <span>{item.name}</span>
                    </label>
                  )}
                </li>
              </label>
            )
          )}
        </ul>
      </div>
    </div>
  );
}

export default FiltersGroup;

const createObjectForSend = (
  manufacturer,
  processorModel,
  memory,
  storage,
  video
) => {
  let object = {};
  if (manufacturer) {
    if (manufacturer.length === 0) {
    } else {
      object.brand = manufacturer;
    }
  }
  if (processorModel) {
    if (processorModel.length === 0) {
    } else {
      object.processorModel = processorModel;
    }
  }
  if (memory) {
    if (memory.length === 0) {
    } else {
      object.memory = memory;
    }
  }
  if (storage) {
    if (storage.length === 0) {
    } else {
      object.storage = storage;
    }
  }
  if (video) {
    if (video.length === 0) {
    } else {
      object.video = video;
    }
  }
  return object;
};

const getFilter = (list) => {
  let value = [];
  let newList = [];
  for (let i of list) {
    newList.push({ name: i.defaultValue, isChecked: i.checked });
    if (i.checked === true) {
      value.push(i.value);
    }
  }
  return {
    value: value,
    newList: newList,
  };
};
