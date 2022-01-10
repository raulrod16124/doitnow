import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

import bgLogin from "./../../../assets/bg-login.svg";
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
    <>
      <img src={bgLogin} alt="background-login" className="bg-login" />
      <div className="login">
        <div className="login-content">
          <form className="login-form">
            <h3 className="error-message">
              {errorMessageLogin !== "" ? errorMessageLogin : ""}
            </h3>
            <h2 className="title">Login</h2>
            <fieldset className="input-content">
              <input
                ref={emailForm}
                type="email"
                className="input"
                placeholder="Email"
              />
            </fieldset>
            <fieldset className="input-content">
              <input
                ref={passwordForm}
                type="password"
                className="input"
                placeholder="Password"
              />
            </fieldset>
            <div className="buttons-content">
              <Link to="/sign-up">Sign up</Link>
              {/* <Link to="/recover-password">Forgot password?</Link> */}
              <Button
                height={"5rem"}
                width={"10rem"}
                label="login"
                size="medium"
                onClick={(e) => handleVerifyUser(e)}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
