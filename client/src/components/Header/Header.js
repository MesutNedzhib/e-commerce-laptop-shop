import React, { useState } from "react";
import "./Header.css";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SearchIcon from "@material-ui/icons/Search";
import Badge from "@material-ui/core/Badge";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import { getProductsByName } from "../../actions/productActions";

function Header({ showAccountBar, setShowAccountBar }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const { userInfo } = useSelector((state) => state.userLogin);

  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const searchValueHandle = (value) => {
    if (value) {
      setShowSearch(true);
      setSearchValue(value);
    } else {
      setShowSearch(false);
    }
  };

  const getProductByName = () => {
    if (searchValue) {
      dispatch(getProductsByName(searchValue));
      setSearchValue("");
      setShowSearch(false);
      history.push("/products");
    }
  };

  const chnageShowAccountBarState = () => {
    if (showAccountBar) {
      return "dropdown";
    } else {
      return "";
    }
  };

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <div className="header">
      <div className="header__container">
        <div
          className="header__left__side"
          onClick={() => setShowAccountBar(false)}
        >
          <div className="header__logo">
            <Link to="/">
              <h4>EFL-SHOP</h4>
            </Link>
          </div>

          <div className="header__nav">
            {/* <div className="header__option">
            <span>Specs</span>
          </div> */}
            <div className="header__option">
              <Link to="/products">
                <span>PRODUCTS</span>
              </Link>
            </div>
            {/* <div className="header__option">
            <span>Contacts</span>
          </div> */}
          </div>
        </div>

        <div className="header__right__side">
          <div
            className="header__option__search"
            onClick={() => setShowAccountBar(false)}
          >
            <input
              type="text"
              value={searchValue}
              className={showSearch ? "input__text" : ""}
              onChange={(e) => searchValueHandle(e.target.value)}
            />
            <SearchIcon onClick={() => getProductByName()} />
          </div>
          <div
            className="header__option__cart"
            onClick={() => setShowAccountBar(false)}
          >
            <Link to="/cart" className="header__link">
              <Badge badgeContent={cartItems?.length} color="secondary">
                <ShoppingCartIcon
                  style={{ width: "28px", height: "28px", color: "white" }}
                />
              </Badge>
            </Link>
          </div>
          <div className="header__option__account">
            <div className="header__option__account__content">
              {userInfo ? (
                <span
                  onClick={() => setShowAccountBar(!showAccountBar)}
                  className="userAvatar"
                >
                  <div className="firstUserLetter">
                    {userInfo.name.charAt(0).toUpperCase()}{" "}
                  </div>
                </span>
              ) : (
                <AccountCircleIcon
                  onClick={() => setShowAccountBar(!showAccountBar)}
                  style={{ width: "30px", height: "30px", color: "white" }}
                />
              )}

              <ul className={`account__content ${chnageShowAccountBarState()}`}>
                <li>
                  My Profile
                  {/* <div className="separator"></div> */}
                </li>
                <li>
                  <Link to="/order_history">My Purchases</Link>
                  {/* <div className="separator"></div> */}
                </li>
                <li>
                  Settings
                  {/* <div className="separator"></div> */}
                </li>
                <li>
                  {userInfo ? (
                    <span onClick={() => logOut()}>Logout</span>
                  ) : (
                    <Link to="/login">Login</Link>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
