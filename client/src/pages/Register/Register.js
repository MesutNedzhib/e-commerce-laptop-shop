import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import "./Register.css";
import { register } from "../../actions/userActions";
import MessageBox from "../../components/MessageBox/MessageBox";
import LoadingBox from "../../components/LoadingBox/LoadingBox";

function Register() {
  const dispatch = useDispatch();

  const history = useHistory();

  const { loading, error, userInfo } = useSelector(
    (state) => state.userRegister
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password and confirm password are not match!");
    } else {
      dispatch(register(name, email, password));
    }
  };

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [userInfo, history]);

  return (
    <div className="register">
      <div className="register__container">
        {/* <div className="register__header__logo">
          <h2>Register</h2>
        </div> */}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox message={error} variant={"error"}></MessageBox>
        ) : (
          <></>
        )}
        <div className="register__body">
          <h1>Register</h1>
          <form className="form" onSubmit={onSubmitHandler}>
            <div className="form__option">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter name"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
              <label htmlFor="confPassword">Confirm Password</label>
              <input
                type="password"
                id="confPassword"
                placeholder="Confirm password"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="form__option">
              <button>Register</button>
            </div>
            <div className="form__option last">
              You have already account? <Link to="/login">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
