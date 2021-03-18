import React from "react";
import "./DeliveryDetails.css";

function DeliveryDetails({ setFullName, setPhone, setCity, setAddress }) {
  // const [select, setSelect] = useState("courier");

  // const selectId = (id) => {
  //   setSelect(id);
  // };

  return (
    <div className="delivery__details">
      <div className="step__title">
        <h2>
          <span>1</span>Delivery Details
        </h2>
      </div>
      {/* <div className="delivery__details__select">
        <div className={`select__option cr-${select}`}>
          <input
            type="radio"
            name="delivery"
            id="courier"
            defaultValue="Delivery"
            onChange={(e) => selectId(e.target.id)}
          />
          <label htmlFor="courier">Delivery by courier</label>
        </div>
        <div className={`select__option off-${select}`}>
          <input
            type="radio"
            name="delivery"
            id="courierOffice"
            defaultChecked
            onChange={(e) => selectId(e.target.id)}
          />
          <label htmlFor="courierOffice">
            Pick up in person from a courier office
          </label>
        </div>
      </div> */}
      <div className="delivery__details__info">
        <div className={`courier courier-courier`}>
          <h2>Address for delivery</h2>
          <div className="delivery__address">
            <div className="address__option">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                placeholder="Example: Ivan Ivanov"
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div className="address__option">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                id="phone"
                placeholder="Example: 089xxxxxx"
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="address__option">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                placeholder="Example: Sofia"
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div className="address__option">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="Address"
                placeholder="Example: kv.Takiq ul.Dedeagach 5"
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
        {/* <div className={`courier office-${select}`}>
          <h2>Courier Office</h2>
          <div className="delivery__address">
            <div className="address__option">
              <label htmlFor="city">Populated place</label>
              <input
                type="text"
                id="city"
                placeholder="Example: Sofia"
                onChange={(e) => setcity(e.target.value)}
                required
              />
            </div>
            <div className="address__option">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                placeholder="Example: kv.Trakiq ul.Stamabolov 1"
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default DeliveryDetails;
