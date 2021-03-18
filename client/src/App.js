import "./App.css";
import Header from "./components/Header/Header";
import { Route, Switch } from "react-router-dom";
import Products from "./pages/Products/Products";
import Cart from "./pages/Cart/Cart";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Checkout from "./pages/Checkout/Checkout";
import UserOrderHistory from "./pages/UserOrderHistory/UserOrderHistory";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import { useState } from "react";
import SuccessfullyPlacedOrder from "./pages/SuccessfullyPlacedOrder/SuccessfullyPlacedOrder";
import Footer from "./components/Footer/Footer";

function App() {
  const [showAccountBar, setShowAccountBar] = useState(false);

  return (
    <div className="App">
      <Header
        showAccountBar={showAccountBar}
        setShowAccountBar={setShowAccountBar}
      />

      <main onClick={() => setShowAccountBar(false)}>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/products">
            <Products />
          </Route>
          <Route path="/product/:id">
            <ProductDetails />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/checkout">
            <Checkout />
          </Route>
          <Route path="/order_history">
            <UserOrderHistory />
          </Route>
          <Route path="/successfully_placed_order">
            <SuccessfullyPlacedOrder />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
