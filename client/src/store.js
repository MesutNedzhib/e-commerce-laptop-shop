import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducer";
import { activeFilterStateReducer } from "./reducers/filterReducers";
import {
  createOrderReducer,
  getMineOrderListReducer,
} from "./reducers/orderReducers";
import {
  productFilterReducer,
  productReducer,
  sortOptionReducer,
} from "./reducers/productReducers";
import { loginReducer, registerReducer } from "./reducers/userReducers";

const initialState = {
  userLogin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};

const reducer = combineReducers({
  cart: cartReducer,
  productList: productReducer,
  userLogin: loginReducer,
  userRegister: registerReducer,
  orderCreate: createOrderReducer,
  userOrders: getMineOrderListReducer,
  productFilter: productFilterReducer,
  activeFilterState: activeFilterStateReducer,
  sortOption: sortOptionReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
