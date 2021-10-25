import React, { useRef } from "react";
import { Link } from "react-router-dom";

import { Button } from "../../../stories/Button";

function RecoverPassword() {
  // References
  const emailForm = useRef();
  const passwordForm = useRef();

  return (
    <div className="login">
      <div className="login-content">
        <form className="login-form">
          <h2 className="title">Do your things!! Recover</h2>
          <fieldset className="input-content">
            <legend className="legend-title">Email</legend>
            <input ref={emailForm} type="email" className="input" autoFocus />
          </fieldset>
          <fieldset className="input-content">
            <legend className="legend-title">Password</legend>
            <input ref={passwordForm} type="password" className="input" />
          </fieldset>
          <div className="buttons-content">
            <Link to="/login">login</Link>
            <Button primary label="Recover" />
          </div>
        </form>
        <div className="login-picture"></div>
      </div>
    </div>
  );
}

export default RecoverPassword;
