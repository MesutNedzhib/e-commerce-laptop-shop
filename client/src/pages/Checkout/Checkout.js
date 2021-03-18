import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import DeliveryDetails from "../../components/CheckoutSteps/DeliveryDetails/DeliveryDetails";
import Payment from "../../components/CheckoutSteps/Payment/Payment";
import "./Checkout.css";
import { createOrder } from "../../actions/orderActions";
import { ORDER_CREATE_RESET } from "../../constants/orderConstants";
import LoadingBox from "../../components/LoadingBox/LoadingBox";
import MessageBox from "../../components/MessageBox/MessageBox";

function Checkout() {
  const dispatch = useDispatch();
  const history = useHistory();

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error } = orderCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [shipping, setShipping] = useState(0);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");

  const toPrice = (num) => Number(num.toFixed(2));

  cart.shippingAddress = { fullName, phone, city, address };

  cart.paymentMethod = paymentMethod;

  cart.itemsPrice = toPrice(
    cartItems.reduce((amount, item) => item.quantity * item.price + amount, 0)
  );

  cart.shippingPrice = toPrice(shipping);

  cart.totalPrice = toPrice(
    cartItems.reduce(
      (amount, item) => item.quantity * item.price + amount + shipping,
      0
    )
  );

  const scrollTop = () => {
    document.documentElement.scrollTop = 0;
  };

  useEffect(() => {
    scrollTop();

    if (!userInfo) {
      history.push("/login");
    }

    if (cart.itemsPrice < 1000) {
      setShipping(9.99);
    }

    if (success) {
      history.push(`/successfully_placed_order`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [
    setShipping,
    cartItems,
    dispatch,
    history,
    cart.itemsPrice,
    success,
    userInfo,
  ]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };

  return (
    <div className="checkout">
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox message={error} variant={"error"}></MessageBox>
      ) : (
        <form className="form" onSubmit={onSubmitHandler}>
          <DeliveryDetails
            setFullName={setFullName}
            setPhone={setPhone}
            setCity={setCity}
            setAddress={setAddress}
          />

          <Payment setPaymentMethod={setPaymentMethod} />

          <div className="checkout__total">
            <div className="checkout__total__info">
              <h2>Order Information</h2>
              <div className="all__products__price">
                <span>Items Price:</span>
                <span>{cart.itemsPrice}</span>
              </div>
              <div className="delivery__fee__price">
                <span>Shipping:</span>
                {cart.itemsPrice > 1000 ? (
                  <span style={{ color: "green" }}>FREE</span>
                ) : (
                  <span>${shipping}</span>
                )}
              </div>
            </div>
            <div className="checkout__total__price">
              <h2>All: {cart.totalPrice}</h2>
              <button type="submit">Continue</button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default Checkout;
