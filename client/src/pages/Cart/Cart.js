import React from "react";
import "./Cart.css";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import CurrencyFormat from "react-currency-format";
import CartItem from "../../components/CartItem/CartItem";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MessageBox from "../../components/MessageBox/MessageBox";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // useEffect(() => {});

  return (
    <div className="cart">
      <div className="cart__header">
        <ShoppingCartIcon className="cart__header__icon" />{" "}
        <span>MY BASKET</span>
      </div>

      {cartItems.length === 0 ? (
        <MessageBox message={"Cart is empty"} variant={"info"}></MessageBox>
      ) : (
        <div className="cart__body">
          <div className="cart__body__header">
            <h4 className="cart__body__header__option_one">Product</h4>
            <h4 className="cart__body__header__option_default">Quantity</h4>
            <h4 className="cart__body__header__option_default">Delete</h4>
            <h4 className="cart__body__header__option_default">Price</h4>
          </div>
          <div className="cart__body__main">
            {cartItems.map((item) => (
              <CartItem
                key={item._id}
                _id={item._id}
                image={item.image}
                name={item.name}
                processor={item.processor}
                memory={item.memory}
                video={item.video}
                storage={item.storage}
                price={item.price}
                quantity={item.quantity}
              />
            ))}
          </div>
          <div className="cart__body__footer__subtotal">
            <CurrencyFormat
              renderText={(value) => (
                <>
                  Subtotal ({cartItems.length} items):<span>{value}</span>
                </>
              )}
              decimalScale={2}
              value={cartItems.reduce(
                (amount, item) => item.quantity * item.price + amount,
                0
              )}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
            />
          </div>
          <div className="cart__body__footer__buttons">
            <Link to="/products">Continue with shoping</Link>
            <Link to="/checkout">Buy</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
