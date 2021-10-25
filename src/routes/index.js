import React, { useContext, useEffect } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router";

import { AuthContext } from "../auth/Auth";
import auth from "../firebase/config";
import Home from "../modules/Home/views/Home";
import Login from "../modules/Login/views/Login";
import RecoverPassword from "../modules/Login/views/RecoverPassword";
import SignUp from "../modules/Login/views/SingUp";
import ProtectedRoutes from "./ProtectedRoutes";

function Routes() {
  const history = useHistory();

  // User Access
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser && currentUser.accessToken !== undefined) {
      localStorage.setItem("user", JSON.stringify(currentUser));
      history.push({ pathname: "/home" });
    }
  }, [currentUser]);

  return (
    <Switch>
      <ProtectedRoutes path="/" exact>
        <Redirect to="/home" />
      </ProtectedRoutes>
      <ProtectedRoutes Component="Home" path="/home" exact>
        <div className="section-content">
          <Home />
        </div>
      </ProtectedRoutes>
      {/* Start Login Section */}
      <Route path="/login" exact>
        <div className="section-content">
          <Login />
        </div>
      </Route>
      <Route path="/sign-up" exact>
        <div className="section-content">
          <SignUp />
        </div>
      </Route>
      <Route path="/recover-password" exact>
        <div className="section-content">
          <RecoverPassword />
        </div>
      </Route>
    </Switch>
  );
}

export default Routes;
