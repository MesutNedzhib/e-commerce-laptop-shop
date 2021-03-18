import {
  ADD_TO_CART,
  CART_EMPTY,
  CHANGE_CART_QUANTITY,
  REMOVE_FROM_CART,
} from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      let addedItem = state.cartItems.find((c) => c._id === action.payload._id);

      if (addedItem) {
        let newState = state.cartItems.map((cartItems) => {
          if (cartItems.quantity === cartItems.countInStock) {
            return cartItems;
          }
          if (cartItems._id === action.payload._id) {
            return Object.assign({}, addedItem, {
              quantity: addedItem.quantity + 1,
            });
          }
          return cartItems;
        });
        return { ...state, cartItems: newState };
      } else {
        return { ...state, cartItems: [...state.cartItems, action.payload] };
      }

    case REMOVE_FROM_CART:
      let newState = state.cartItems.filter(
        (cartItem) => cartItem._id !== action.payload._id
      );
      return {
        ...state,
        cartItems: newState,
      };

    case CHANGE_CART_QUANTITY:
      let changeAddedItem = state.cartItems.find(
        (c) => c._id === action.payload._id
      );

      if (changeAddedItem) {
        let newState = state.cartItems.map((cartItems) => {
          if (cartItems._id === action.payload._id) {
            return Object.assign({}, changeAddedItem, {
              quantity: (changeAddedItem.quantity = action.payload.quantity),
            });
          }
          return cartItems;
        });

        return { ...state, cartItems: newState };
      } else {
        return { ...state, cartItems: [...state.cartItems, action.payload] };
      }

    case CART_EMPTY:
      return { ...state, cartItems: [] };

    default:
      return state;
  }
};
