import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

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

    // userNameForm.current.value = "";
    emailForm.current.value = "";
    passwordForm.current.value = "";
    passwordConfirmationForm.current.value = "";
  };

  return (
    <div className="login">
      <div className="login-content">
        <form className="login-form">
          <h3 className="error-message">
            {errorMessageLogin !== "" ? errorMessageLogin : ""}
          </h3>
          <h2 className="title">Create account</h2>
          {/* <fieldset className="input-content">
            <legend className="legend-title">Name</legend>
            <input ref={userNameForm} type="text" className="input" autoFocus />
          </fieldset> */}
          <fieldset className="input-content">
            <legend className="legend-title">Email</legend>
            <input ref={emailForm} type="email" className="input" />
          </fieldset>
          <fieldset className="input-content">
            <legend className="legend-title">Password</legend>
            <input ref={passwordForm} type="password" className="input" />
          </fieldset>
          <fieldset className="input-content">
            <legend className="legend-title">Password Confirmation</legend>
            <input
              ref={passwordConfirmationForm}
              type="password"
              className="input"
            />
          </fieldset>
          <div className="buttons-content">
            <Link to="/login">login</Link>
            <Button
              primary
              label="Sign up"
              onClick={(e) => handleCreateNewUser(e)}
            />
          </div>
        </form>
        <div className="login-picture"></div>
      </div>
    </div>
  );
}

export default SignUp;