import React from "react";
import "./CartItem.css";
import CheckSharpIcon from "@material-ui/icons/CheckSharp";
import CancelSharpIcon from "@material-ui/icons/CancelSharp";
import { useDispatch } from "react-redux";
import { chnageCartQuantity, removeFromCart } from "../../actions/cartActions";
import CurrencyFormat from "react-currency-format";
function CartItem({
  _id,
  image,
  name,
  processor,
  memory,
  video,
  storage,
  price,
  quantity,
}) {
  const dispatch = useDispatch();

  const chnageCartQuantityHandle = (value, id) => {
    dispatch(chnageCartQuantity({ quantity: value, _id: id }));
  };

  const removeFromCartHandle = (product) => {
    dispatch(removeFromCart(product));
  };

  return (
    <div className="cart__item">
      <div className="cart__item__info">
        <img src={image} alt={image} />
        <p>{name}</p>
        <ul>
          <li>
            <CheckSharpIcon className="icon" /> <span>{processor}</span>
          </li>
          <li>
            <CheckSharpIcon className="icon" /> <span>{memory}</span>
          </li>
          <li>
            <CheckSharpIcon className="icon" /> <span>{video}</span>
          </li>
          <li>
            <CheckSharpIcon className="icon" /> <span>{storage}</span>
          </li>
        </ul>
      </div>
      <div className="cart__item__quantity">
        <span>X</span>
        <input
          type="number"
          defaultValue={quantity}
          min="1"
          onChange={(e) => chnageCartQuantityHandle(e.target.value, _id)}
        />
      </div>
      <div className="cart__item__delete">
        <CancelSharpIcon
          className="delete__icon"
          onClick={() => removeFromCartHandle({ _id })}
        />
      </div>
      <div className="cart__item__price">
        <CurrencyFormat
          renderText={(value) => (
            <>
              <span>{value}</span>
            </>
          )}
          decimalScale={2}
          value={price * quantity}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
        />
      </div>
    </div>
  );
}

export default CartItem;
