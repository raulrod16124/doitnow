import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

import bgLogin from "./../../../assets/bg-login.svg";
import auth from "../../../firebase/config";
import { Button } from "../../../stories/Button";
import { CreateUser } from "../state/actions";

function SignUp() {
  const LoginState = useSelector((state) => {
    return state.LoginReducer;
  });

  const dispatch = useDispatch();

  const history = useHistory();

  // References
  // const userNameForm = useRef();
  const emailForm = useRef();
  const passwordForm = useRef();
  const passwordConfirmationForm = useRef();

  // Error Controller
  const [errorMessageLogin, setErrorMessageLogin] = useState("");

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

  const handleCreateNewUser = (e) => {
    e.preventDefault();
    if (
      // userNameForm.current.value !== "" &&
      emailForm.current.value !== "" &&
      passwordForm.current.value !== ""
    ) {
      if (
        passwordForm.current.value === passwordConfirmationForm.current.value
      ) {
        const newUser = {
          email: emailForm.current.value,
          password: passwordForm.current.value,
        };
        dispatch(CreateUser(newUser));
        emailForm.current.value = "";
        passwordForm.current.value = "";
        passwordConfirmationForm.current.value = "";
      } else {
        setErrorMessageLogin("passwords do not match");
        setTimeout(() => {
          setErrorMessageLogin("");
        }, 1500);
      }
    } else {
      setErrorMessageLogin("missing data");
      setTimeout(() => {
        setErrorMessageLogin("");
      }, 1500);
    }
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
            <h2 className="title">Create account</h2>
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
            <fieldset className="input-content">
              <input
                ref={passwordConfirmationForm}
                type="password"
                className="input"
                placeholder="Password confirmation"
              />
            </fieldset>
            <div className="buttons-content">
              <Link to="/login">login</Link>
              <Button
                label="Sign up"
                primary
                size="medium"
                onClick={(e) => handleCreateNewUser(e)}
              />
            </div>
          </form>
          <div className="login-picture"></div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
