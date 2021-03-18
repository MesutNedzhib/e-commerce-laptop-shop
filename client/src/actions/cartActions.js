import {
  ADD_TO_CART,
  CHANGE_CART_QUANTITY,
  CHECKOUT_SAVE,
  REMOVE_FROM_CART,
} from "../constants/cartConstants";

export const addToCart = (cartItem) => (dispatch, getState) => {
  dispatch({
    type: ADD_TO_CART,
    payload: cartItem,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (_id) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: _id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const chnageCartQuantity = (cartItem) => (dispatch) => {
  dispatch({
    type: CHANGE_CART_QUANTITY,
    payload: cartItem,
  });
};

export const checkoutSave = (data) => (dispatch) => {
  dispatch({
    type: CHECKOUT_SAVE,
    payload: data,
  });
  localStorage.setItem("userCheckout", JSON.stringify(data));
};
