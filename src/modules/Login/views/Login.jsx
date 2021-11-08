import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

import auth from "../../../firebase/config";
import { Button } from "../../../stories/Button";
import { CheckUser } from "../state/actions";

function Login() {
  const LoginState = useSelector((state) => {
    return state.LoginReducer;
  });

  const dispatch = useDispatch();
  const history = useHistory();

  // Error Controller
  const [errorMessageLogin, setErrorMessageLogin] = useState("");

  // References
  const emailForm = useRef();
  const passwordForm = useRef();

  useEffect(() => {
    if (auth.currentUser) {
      history.push({ pathname: "/home" });
    }
    if (LoginState.status === "error") {
      setErrorMessageLogin(LoginState.error);
      setTimeout(() => {
        setErrorMessageLogin("");
      }, 1500);
    }
  }, [LoginState]);

  const handleVerifyUser = (e) => {
    e.preventDefault();
    if (emailForm.current.value !== "" && passwordForm.current.value !== "") {
      const userLogged = {
        email: emailForm.current.value,
        password: passwordForm.current.value,
      };
      dispatch(CheckUser(userLogged));
    } else {
      setErrorMessageLogin("missing data");
      setTimeout(() => {
        setErrorMessageLogin("");
      }, 1500);
    }
    //Clean inputs value
    emailForm.current.value = "";
    passwordForm.current.value = "";
  };

  return (
    <div className="login">
      <div className="login-content">
        <form className="login-form">
          <h3 className="error-message">
            {errorMessageLogin !== "" ? errorMessageLogin : ""}
          </h3>
          <h2 className="title">Login</h2>
          <fieldset className="input-content">
            <legend className="legend-title">Email</legend>
            <input ref={emailForm} type="email" className="input" autoFocus />
          </fieldset>
          <fieldset className="input-content">
            <legend className="legend-title">Password</legend>
            <input ref={passwordForm} type="password" className="input" />
          </fieldset>
          <div className="buttons-content">
            <Link to="/sign-up">Sign up</Link>
            <Link to="/recover-password">Forgot password?</Link>
            <Button label="login" onClick={(e) => handleVerifyUser(e)} />
          </div>
        </form>
        <div className="login-picture"></div>
      </div>
    </div>
  );
}

export default Login;
