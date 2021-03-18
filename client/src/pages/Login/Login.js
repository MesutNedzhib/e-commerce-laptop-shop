import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Login.css";
import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import { Link, useHistory } from "react-router-dom";
import { login } from "../../actions/userActions";
import MessageBox from "../../components/MessageBox/MessageBox";
import LoadingBox from "../../components/LoadingBox/LoadingBox";

function Login() {
  const dispatch = useDispatch();

  const history = useHistory();

  const { loading, error, userInfo } = useSelector((state) => state.userLogin);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [userInfo, history]);

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__header__logo">
          <LaptopMacIcon />
          <h4>Shop</h4>
        </div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : (
          <>
            {error ? (
              <MessageBox message={error} variant={"error"}></MessageBox>
            ) : (
              <></>
            )}
            <div className="login__body">
              <h1>Welcome</h1>
              <form className="form" onSubmit={onSubmitHandler}>
                <div className="form__option">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="text"
                    id="email"
                    placeholder="Enter email address"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form__option">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form__option">
                  <button>Login</button>
                </div>
                <div className="form__option last">
                  New Customer ?<Link to="/register">Create your account</Link>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
